<script lang="ts">
  import { page } from "$app/stores";
  import SignoutButton from "$lib/components/signoutButton.svelte";
  import { getUser, handleSession } from "@lucia-auth/sveltekit/client";
  import "../app.css";

  handleSession(page);

  const user = getUser();
</script>

<div class="px-[8%] max-w-7xl mx-auto">
  <nav class="navbar">
    <ul class="flex gap-4">
      {#if $user}
        <li>
          <a href="/" class="link link-primary link-hover">Home</a>
        </li>
        <li>
          <a href="/profile" class="link link-primary link-hover">Profile</a>
        </li>
        <li>
          <SignoutButton />
        </li>
      {:else}
        <li>
          <a href="/signin" class="link link-primary link-hover">Sign in</a>
        </li>
        <li>
          <a href="/signup" class="link link-primary link-hover">Sign up</a>
        </li>
      {/if}
    </ul>
  </nav>

  <main>
    <slot />
  </main>
</div>
