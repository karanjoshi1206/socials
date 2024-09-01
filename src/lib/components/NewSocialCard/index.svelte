<script lang="ts">
  import type { TNewSocial } from "$lib/types/socials";
  type handleSocial = (socialId: string) => void;
  export let social: TNewSocial;
  export let handleClick: handleSocial;

  const handleFillInformation = () => {
    handleClick(social.socialId || "");
  };

  const logoBaseUrl = "https://res.cloudinary.com/dzbdyvmj6/image/upload/f_auto,q_auto/v1/"
</script>



<div class="social-card">
  <img src={logoBaseUrl + social.socialLogo} alt={"lgo"} class="social-card-logo" />

  <div class="social-card-content">
    <div class="social-card-title">{social.title}</div>
    <div class="social-card-subtitle">@{social.title.toLowerCase()}</div>
  </div>
  <button on:click={handleFillInformation} class="social-card-btn">Fill Information</button>
</div>

<style>
  .social-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px; /* Maintain consistent width */
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .social-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .social-card-logo {
    width: 60px;
    height: 60px;
    margin-right: 16px;
    border-radius: 50%;
    mix-blend-mode: darken; /* Consistent with your current UI */
  }

  .social-card-content {
    flex: 1;
  }

  .social-card-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }

  .social-card-subtitle {
    font-size: 14px;
    color: #666;
  }

  .social-card-btn {
    background-color: #1da1f2; /* Customize color as needed */
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .social-card-btn:hover {
    background-color: #1a91da;
  }
</style>
