<script lang="ts">
  import { page } from "$app/stores";
  import { currentUser } from "$lib/stores/user";
  import "../app.css";
  import { base } from "$app/paths";

  let { children } = $props();
</script>

<svelte:head>
  <title>Job Marketplace</title>
</svelte:head>

<div>
  <nav class="navbar">
    <div class="logo"><a href="{base}/">JOB MARKETPLACE</a></div>

    <div class="nav-links">
      <a href="{base}/" class:selected={$page.url.pathname === `${base}/`}>Home</a>
      <a href="{base}/jobs" class:selected={$page.url.pathname.startsWith(`${base}/jobs`)}
        >Job Offers</a
      >
      <a
        href="{base}/companies"
        class:selected={$page.url.pathname.startsWith(`${base}/companie`)}
        >Companies</a
      >

      {#if $currentUser}
        <a
          href="{base}/applications"
          class:selected={$page.url.pathname.startsWith(`${base}/applications`)}
          >My Applications</a
        >
        <a href="{base}/hr" class:selected={$page.url.pathname.startsWith(`${base}/hr`)}
          >HR Panel</a
        >
      {/if}

      {#if $currentUser}
        <span class="login">{$currentUser.email}</span>
        <button class="logout" onclick={() => currentUser.set(null)}>
          Logout
        </button>
      {:else}
        <a
          href="{base}/login"
          class:selected={$page.url.pathname.startsWith(`${base}/login`)}>Login</a
        >
      {/if}
    </div>
  </nav>

  <main class="content">
    {@render children()}
  </main>
</div>
