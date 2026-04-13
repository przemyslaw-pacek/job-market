<script lang="ts">
  import { jobs, type Job } from "$lib/stores/jobs";
  import { companies } from "$lib/stores/companies";
  import { currentUser } from "$lib/stores/user";

  let title = "";
  let salary = "";
  let description = "";
  let companyId = "";
  let branchId = "";

  let success = false;

  $: availableCompanies = $companies.filter((c) => {
    const isOwner = c.ownerId === $currentUser?.id;

    const isHR = c.branches.some((b) => b.hrEmail === $currentUser?.email);

    return isOwner || isHR;
  });

  $: selectedCompany = $companies.find((c) => c.id === companyId);

  $: availableBranches = selectedCompany
    ? selectedCompany.branches.filter((b) => {
        const isOwner = selectedCompany.ownerId === $currentUser?.id;
        const isHR = b.hrEmail === $currentUser?.email;
        return isOwner || isHR;
      })
    : [];

  function submitJob() {
    if (!title.trim() || !salary.trim() || !companyId || !branchId) return;

    const user = $currentUser;

    const company = $companies.find((c) => c.id === companyId);

    const isOwner = company?.ownerId === user?.id;

    const isHR = company?.branches.some((b) => b.hrEmail === user?.email);

    if (!company || (!isOwner && !isHR)) {
      return;
    }

    if (!user) return;

    const newJob: Job = {
      id: Date.now(),
      title,
      salary,
      description,
      companyId,
      branchId,
      ownerId: user.id,
    };

    jobs.update((current) => [...current, newJob]);

    success = true;

    title = "";
    salary = "";
    description = "";
    companyId = "";
    branchId = "";

    setTimeout(() => {
      success = false;
    }, 3000);
  }
</script>

<div class="container">
  <h2>Post a Job</h2>

  {#if availableCompanies.length === 0}
    <p>You don't have access to any companies.</p>
    <a href="/companies/create" class="button">Create Company</a>
  {:else}
    <form on:submit|preventDefault={submitJob}>
      <div class="field">
        <input
          class="input"
          placeholder="Job title"
          bind:value={title}
          required
        />

        <input
          class="input"
          placeholder="Salary range"
          bind:value={salary}
          required
        />

        <textarea
          class="input"
          placeholder="Job description"
          rows="4"
          bind:value={description}
        ></textarea>
      </div>

      <h3>Select Company</h3>

      <select class="input" bind:value={companyId} required>
        <option value="">Select Company</option>
        {#each availableCompanies as company}
          <option value={company.id}>
            {company.name}
          </option>
        {/each}
      </select>

      {#if selectedCompany}
        <h3>Select Branch</h3>

        <select class="input" bind:value={branchId} required>
          <option value="">Select branch</option>
          {#each availableBranches as branch}
            <option value={branch.id}>
              {branch.country} - {branch.city}
            </option>
          {/each}
        </select>
      {/if}

      <button class="button" type="submit" disabled={!$currentUser}>
        Post Job
      </button>
    </form>
  {/if}
</div>

{#if success}
  <div class="success">Job posted successfully!</div>
{/if}

<style>
  .field {
    display: grid;
    grid-template-columns: auto;
    gap: 12px;
  }
</style>
