<script lang="ts">
  import favicon from "$lib/assets/icon.svg";
  import { page } from "$app/stores";
  import { currentUser } from "$lib/stores/user";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div>
  <nav class="navbar">
    <div class="logo"><a href="/">JOB MARKETPLACE</a></div>

    <div class="nav-links">
      <a href="/" class:selected={$page.url.pathname === "/"}>Home</a>
      <a href="/jobs" class:selected={$page.url.pathname.startsWith("/jobs")}
        >Job Offers</a
      >
      <a
        href="/companies"
        class:selected={$page.url.pathname.startsWith("/companies")}
        >Companies</a
      >

      {#if $currentUser}
        <a
          href="/applications"
          class:selected={$page.url.pathname.startsWith("/applications")}
          >My Applications</a
        >
        <a href="/hr" class:selected={$page.url.pathname.startsWith("/hr")}
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
          href="/login"
          class:selected={$page.url.pathname.startsWith("/login")}>Login</a
        >
      {/if}
    </div>
  </nav>

  <main class="content">
    {@render children()}
  </main>
</div>
