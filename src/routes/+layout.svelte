<script lang="ts">
  import "../app.css";
</script>

<div class="px-[8%] max-w-7xl mx-auto">
  <nav class="navbar">
    <ul class="flex gap-4">
      <li>
        <a href="/" class="link link-primary link-hover">Home</a>
      </li>
    </ul>
  </nav>

  <main>
    <slot />
  </main>
</div>
