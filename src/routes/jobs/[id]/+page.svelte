<script lang="ts">
  import { page } from "$app/stores";
  import { jobs, type Job } from "$lib/stores/jobs";
  import { companies } from "$lib/stores/companies";
  import { applications } from "$lib/stores/applications";
  import { currentUser } from "$lib/stores/user";

  let job: Job | undefined;

  $: {
    const id = Number($page.params.id);
    job = $jobs.find((j) => j.id === id);
  }

  $: company = job
    ? $companies.find((o) => o.id === job?.companyId)
    : undefined;

  $: branch = company
    ? company.branches.find((b) => b.id === job?.branchId)
    : undefined;

  function apply() {
    if (!job) return;

    const currentJob = job;

    const user = $currentUser;
    if (!user) return;

    applications.update((current) => [
      ...current,
      {
        jobId: currentJob.id,
        appliedAt: Date.now(),
        status: "pending",
        userId: $currentUser?.id ?? "",
        userEmail: user.email,
      },
    ]);
  }

  $: isApplied = job
    ? $applications.some(
        (a) => a.jobId === job?.id && a.userId === $currentUser?.id,
      )
    : false;
</script>

<div class="container">
  {#if job}
    <h2>{job.title}</h2>

    <p>
      <strong>Company:</strong>
      {company ? company.name : "Unknown"}
    </p>

    <p>
      <strong>Location:</strong>
      {branch ? `${branch.country} - ${branch.city}` : "Unknown"}
    </p>

    <p><strong>Salary:</strong> {job.salary}</p>

    {#if job.description}
      <p>
        <strong>Description:</strong><br />
        {job.description}
      </p>
    {/if}

    <button
      class="button"
      on:click={apply}
      disabled={!$currentUser || isApplied}
    >
      {isApplied ? "Already Applied" : "Apply Now"}
    </button>
  {:else}
    <p>Job not found.</p>
  {/if}
</div>
