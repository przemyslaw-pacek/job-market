<script lang="ts">
  import { companies, type Company, type Branch } from "$lib/stores/companies";
  import { goto } from "$app/navigation";
  import { currentUser } from "$lib/stores/user";
  import { base } from "$app/paths";

  let name = "";
  let description = "";
  let success = false;

  let branches: Branch[] = [
    {
      id: crypto.randomUUID(),
      country: "",
      city: "",
      hrEmail: "",
    },
  ];

  function addBranch() {
    branches = [
      ...branches,
      {
        id: crypto.randomUUID(),
        country: "",
        city: "",
        hrEmail: "",
      },
    ];
  }

  function removeBranch(id: string) {
    if (branches.length === 1) return;
    branches = branches.filter((b) => b.id !== id);
  }

  function saveCompany() {
    const user = $currentUser;
    if (!user) return;

    if (!name.trim()) return;

    const hasInvalidBranch = branches.some(
      (b) => !b.country.trim() || !b.city.trim() || !b.hrEmail.trim(),
    );

    if (hasInvalidBranch) return;

    const newCompany: Company = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      branches: branches.map((b) => ({
        ...b,
        country: b.country.trim(),
        city: b.city.trim(),
        hrEmail: b.hrEmail.trim(),
      })),
      ownerId: user.id,
    };

    companies.update((current) => [...current, newCompany]);

    name = "";
    description = "";
    branches = [
      {
        id: crypto.randomUUID(),
        country: "",
        city: "",
        hrEmail: "",
      },
    ];

    success = true;

    setTimeout(() => {
      success = false;
      goto(`${base}/companies`);
    }, 3000);
  }
</script>

<div class="container">
  <h2>Create Company</h2>

  {#if !$currentUser}
    <p>You must be logged in to create company.</p>
    <a href="{base}/login" class="button">Go to Login</a>
  {:else}
    <form on:submit|preventDefault={saveCompany}>
      <div class="branch-card">
        <input
          class="input"
          placeholder="Company Name"
          bind:value={name}
          required
        />

        <textarea
          class="input"
          placeholder="Description"
          bind:value={description}
        ></textarea>
      </div>

      <h3>HR Branches</h3>

      {#each branches as branch (branch.id)}
        <div class="branch-card">
          <input
            class="input"
            placeholder="Country"
            bind:value={branch.country}
            required
          />

          <input
            class="input"
            placeholder="City"
            bind:value={branch.city}
            required
          />

          <input
            class="input"
            type="email"
            placeholder="HR Email"
            bind:value={branch.hrEmail}
            required
          />

          <div>
            <button
              type="button"
              class="button danger"
              on:click={() => removeBranch(branch.id)}
            >
              Remove Branch
            </button>
          </div>
        </div>
      {/each}

      <div class="buttons">
        <button type="button" class="button" on:click={addBranch}>
          + Add Branch
        </button>

        <button type="submit" class="button" disabled={!$currentUser}>
          Save Company
        </button>
      </div>
    </form>
  {/if}
</div>

{#if success}
  <div class="success">Company created successfully!</div>
{/if}
