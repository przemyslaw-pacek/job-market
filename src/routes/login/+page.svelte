<script lang="ts">
  import { currentUser, type User } from "$lib/stores/user";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  let loginEmail = "";
  let loginPassword = "";

  let registerEmail = "";
  let registerPassword = "";
  let confirmPassword = "";
  let firstName = "";
  let lastName = "";
  let address = "";

  let showRegister = false;
  let success = false;

  let loginError = "";
  let registerError = "";

  function login(e: SubmitEvent) {
    e.preventDefault();
    loginError = "";

    if (!browser) return;

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword,
    );

    if (!user) {
      loginError = "Invalid email or password";
      return;
    }

    currentUser.set(user);
    goto("/");
  }

  function register(e: SubmitEvent) {
    e.preventDefault();
    registerError = "";

    if (!browser) return;

    if (!registerPassword) {
      registerError = "Password is required";
      return;
    }

    if (registerPassword !== confirmPassword) {
      registerError = "Passwords do not match";
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === registerEmail)) {
      registerError = "User already exists";
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: registerEmail,
      password: registerPassword,
      firstName,
      lastName,
      address,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    success = true;

    registerEmail =
      registerPassword =
      confirmPassword =
      firstName =
      lastName =
      address =
        "";

    setTimeout(() => {
      success = false;
      showRegister = false;
    }, 3000);
  }

  function toggleRegister() {
    showRegister = !showRegister;

    loginEmail = "";
    loginPassword = "";
    loginError = "";
    registerError = "";
  }
</script>

<div class="container">
  <h2>Login</h2>
  <form onsubmit={login}>
    <div class="cells">
      <input
        class="input"
        type="email"
        placeholder="Email"
        bind:value={loginEmail}
        required
      />
      <input
        class="input"
        type="password"
        placeholder="Password"
        bind:value={loginPassword}
        required
      />
    </div>

    {#if loginError}
      <p class="error">{loginError}</p>
    {/if}

    <button class="button" type="submit">Login</button>
    <button type="button" class="button" onclick={toggleRegister}>
      {showRegister ? "Cancel" : "Register"}
    </button>
  </form>

  {#if showRegister}
    <div class="card">
      <form onsubmit={register}>
        <h3>Create account</h3>
        <div class="cells">
          <input
            class="input"
            type="email"
            placeholder="Email"
            bind:value={registerEmail}
            required
          />

          <input
            class="input"
            type="password"
            placeholder="Password"
            bind:value={registerPassword}
          />
          <input
            class="input"
            type="password"
            placeholder="Confirm password"
            bind:value={confirmPassword}
          />
          <input
            class="input"
            placeholder="First name"
            bind:value={firstName}
            required
          />
          <input
            class="input"
            placeholder="Last name"
            bind:value={lastName}
            required
          />
          <input
            class="input"
            placeholder="Address (optional)"
            bind:value={address}
          />
        </div>

        {#if registerError}
          <p class="error">{registerError}</p>
        {/if}

        <button class="button" type="submit"> Create account </button>
      </form>
    </div>
  {/if}
</div>

{#if success}
  <div class="success">Account created successfully!</div>
{/if}

<style>
  .card {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .error {
    color: red;
    margin-top: 6px;
  }
</style>
