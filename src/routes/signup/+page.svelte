<script lang="ts">
  // We use axios here, but you can use any HTTP client, such as fetch
  import axios from "axios";
  import type { ActionResult } from "@sveltejs/kit";

  let email: string;
  let password: string;
  let err: string;

  const signup = async () => {
    err = "";

    try {
      const { data } = await axios.postForm<ActionResult>("", {
        email,
        password,
      });

      if (data.type === "success") {
        email = password = "";

        // If successful, redirect to the home page
        window.location.href = "/";
      } else err = "Something went wrong";
    } catch (error) {
      console.log(error);
      err = error?.response?.data?.error?.message;
    }
  };
</script>

<form on:submit|preventDefault={signup}>
  <input
    class="input input-sm"
    type="email"
    autocomplete="email"
    placeholder="Email"
    bind:value={email}
  />
  <input
    class="input input-sm"
    type="password"
    autocomplete="new-password"
    placeholder="Password"
    bind:value={password}
  />

  <button class="my-4 btn btn-primary" type="submit"> Signup </button>

  {#if err}
    <div class="text-red-500">{err}</div>
  {/if}
</form>
