<script>
  import { goto } from "$app/navigation";

  const handleLogin = () => {
    goto("/login");
  };
</script>

<a href="/" class="main-heading">Socials</a>
<button on:click={handleLogin}>Login</button>
