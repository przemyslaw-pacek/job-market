<script lang="ts">
  import favicon from "$lib/assets/icon.svg";
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
      <a href="/">Home</a>
      <a href="/jobs">Job Offers</a>
      <a href="/companies">Companies</a>

      {#if $currentUser}
        <a href="/applications">My Applications</a>
        <a href="/hr">HR Panel</a>
      {/if}

      {#if $currentUser}
        <span class="login">{$currentUser.email}</span>
        <button class="logout" on:click={() => currentUser.set(null)}>
          Logout
        </button>
      {:else}
        <a href="/login">Login</a>
      {/if}
    </div>
  </nav>

  <main class="content">
    {@render children()}
  </main>
</div>
