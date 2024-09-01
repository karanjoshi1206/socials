<script>
    import PreBuiltSocialList from "$lib/components/PreBuiltSocialList/index.svelte";
    import Navbar from "$lib/components/Navbar/index.svelte";

  </script>
  
  <svelte:head>
    <title>New Social</title>
    <meta name="description" content="Svelte demo app" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="use-credentials" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></svelte:head>
  
  <main class="main-container">
    <Navbar/>
    <PreBuiltSocialList />
  </main>
  
  <style>
    .main-container {
      padding: 8px;
    }
  
    .main-heading{
      font-size: 32px;
    }
  </style>
  