<script lang="ts">
  import axios from "axios";
  import { invalidateAll } from "$app/navigation";
</script>

<button
  class="btn btn-sm btn-ghost"
  on:click={async () => {
    await axios.post("/api/signout");
    await invalidateAll();
  }}
>
  Sign out
</button>
