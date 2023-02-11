<script lang="ts">
  import axios from "axios";
  import type { ActionResult } from "@sveltejs/kit";

  let email: string;
  let password: string;
  let err: string;

  const signin = async () => {
    err = "";

    try {
      const { data } = await axios.postForm<ActionResult>("", {
        email,
        password,
      });

      if (data.type === "redirect") {
        email = password = "";
        // If successful, redirect
        window.location.href = data.location;
      }
    } catch (error) {
      console.log(error);
      err = error?.response?.data?.error?.message;
    }
  };
</script>

<form on:submit|preventDefault={signin}>
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
    autocomplete="current-password"
    placeholder="Password"
    bind:value={password}
  />

  <button class="my-4 btn btn-primary" type="submit"> Sign in </button>

  {#if err}
    <div class="text-red-500">{err}</div>
  {/if}
</form>
