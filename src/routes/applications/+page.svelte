<script lang="ts">
  import { applications } from "$lib/stores/applications";
  import { jobs } from "$lib/stores/jobs";
  import { companies } from "$lib/stores/companies";
  import { currentUser } from "$lib/stores/user";

  function isNotNull<T>(value: T | null): value is T {
    return value !== null;
  }

  $: userApplications = $applications

    .filter((app) => app.userId === $currentUser?.id || !app.userId)
    .map((app) => {
      const job = $jobs.find((j) => j.id === app.jobId);
      if (!job) return null;

      const company = $companies.find((c) => c.id === job.companyId);

      return {
        ...app,
        jobTitle: job.title,
        salary: job.salary,
        companyName: company?.name ?? "Unknown",
      };
    })
    .filter(isNotNull);
</script>

<div class="container">
  <h2>My Applications</h2>

  {#if !$currentUser}
    <p>Please login to see your applications.</p>
  {:else if userApplications.length === 0}
    <p>You haven't applied to any jobs yet.</p>
  {:else}
    {#each userApplications as app}
      <div class="tile">
        <h3>{app.jobTitle}</h3>

        <p><strong>Company:</strong> {app.companyName}</p>

        <p><strong>Salary:</strong> {app.salary}</p>

        <p>
          <strong>Applied at:</strong>
          {new Date(app.appliedAt).toLocaleString()}
        </p>

        <p>
          <strong>Status:</strong>
          <span class={`status ${app.status}`}>
            {app.status}
          </span>
        </p>
      </div>
    {/each}
  {/if}
</div>
