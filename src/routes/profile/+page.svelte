<script lang="ts">
  import { getUser } from "@lucia-auth/sveltekit/client";

  const user = getUser();
</script>

<h1>Profile</h1>
{#if $user}
  <!-- Here we have access to the data returned by auth.transformUserData -->
  <p>User id: {$user?.userId}</p>
  <p>Email: {$user?.email}</p>
{:else}
  <p>Not signed in</p>
{/if}
