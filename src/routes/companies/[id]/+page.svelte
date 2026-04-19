<script lang="ts">
  import { page } from "$app/stores";
  import { companies, type Company } from "$lib/stores/companies";
  import { jobs, type Job } from "$lib/stores/jobs";
  import { currentUser } from "$lib/stores/user";

  let company: Company | undefined;

  $: company = $companies.find((o) => o.id === $page.params.id);

  let companyJobs: Job[] = [];

  $: companyJobs = company
    ? $jobs.filter((job) => job.companyId === company.id)
    : [];

  $: isOwner = company?.ownerId === $currentUser?.id;

  let country = "";
  let city = "";
  let hrEmail = "";

  function addBranch() {
    if (!company || !country.trim() || !city.trim() || !hrEmail.trim()) return;

    companies.update((firms) =>
      firms.map((c) =>
        c.id === company.id
          ? {
              ...c,
              branches: [
                ...c.branches,
                {
                  id: crypto.randomUUID(),
                  country,
                  city,
                  hrEmail,
                },
              ],
            }
          : c,
      ),
    );

    country = "";
    city = "";
    hrEmail = "";
  }

  function canDeleteBranch(branchId: string): boolean {
    if (!company) return false;

    const isUsed = $jobs.some(
      (job) => job.companyId === company.id && job.branchId === branchId,
    );

    return !isUsed;
  }

  function removeBranch(branchId: string) {
    if (!company || !isOwner) return;

    const companyId = company.id;

    companies.update((current) =>
      current.map((c) => {
        if (c.id !== companyId) return c;

        return {
          ...c,
          branches: c.branches.filter((b) => b.id !== branchId),
        };
      }),
    );
  }
</script>

<div class="container">
  {#if company}
    <h2>{company.name}</h2>

    <div>
      {#if isOwner}
        <a class="button" href={`/hr/${company.id}`}> Open HR Panel </a>
        <form class="form" on:submit|preventDefault={addBranch}>
          <input
            class="input"
            placeholder="Country"
            bind:value={country}
            required
          />

          <input class="input" placeholder="City" bind:value={city} required />

          <input
            class="input"
            placeholder="HR Email"
            bind:value={hrEmail}
            required
          />

          <button class="button">Add Branch</button>
        </form>
      {/if}
    </div>

    {#if company.description}
      <p>
        {company.description}
      </p>
    {/if}

    <h3>Branches</h3>

    {#if company.branches.length === 0}
      <p>No branches yet.</p>
    {:else}
      {#each company.branches as branch}
        <div class="branch-card">
          <p><strong>Country:</strong> {branch.country}</p>
          <p><strong>City:</strong> {branch.city}</p>
          <p><strong>HR Email:</strong> {branch.hrEmail}</p>

          {#if isOwner && company.branches.length > 1}
            <div>
              <button
                class="button danger"
                disabled={!canDeleteBranch(branch.id)}
                title={!canDeleteBranch(branch.id)
                  ? "Cannot delete branch with jobs"
                  : undefined}
                on:click={() => removeBranch(branch.id)}
              >
                Remove Branch
              </button>
            </div>
          {/if}
        </div>
      {/each}
    {/if}

    <h3>Job Offers</h3>

    {#if companyJobs.length === 0}
      <p>No job offers for this company yet.</p>
    {:else}
      {#each companyJobs as job}
        <div class="tile">
          <h4>
            <a href={`/jobs/${job.id}`} class="job-link">
              {job.title}
            </a>
          </h4>
          <p><strong>Salary:</strong> {job.salary}</p>
        </div>
      {/each}
    {/if}
  {:else}
    <p>Company not found.</p>
  {/if}
</div>

<style>
  .form {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 10px;
    margin-top: 10px;
  }
</style>
