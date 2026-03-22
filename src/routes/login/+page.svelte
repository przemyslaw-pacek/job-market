<script lang="ts">
  import { currentUser, type User } from "$lib/stores/user";
  import { goto } from "$app/navigation";

  let email = "";

  function login() {
    if (!email) return;

    const existingUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]",
    );

    let user = existingUsers.find((u: User) => u.email === email);

    if (!user) {
      user = {
        id: crypto.randomUUID(),
        email,
      };

      localStorage.setItem("users", JSON.stringify([...existingUsers, user]));
    }

    currentUser.set(user);

    goto("/");
  }
</script>

<div class="container buttons">
  <input class="input" bind:value={email} placeholder="Email" />
  <button class="button" type="submit" on:click={login}>Login</button>
</div>
