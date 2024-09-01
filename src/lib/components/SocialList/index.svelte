<script lang="ts">
  import SocialCard from "../SocialCard/index.svelte";
  import Modal from "../Modal/index.svelte";
  import type { TSocial } from "../../types/socials";
  const socialList: TSocial[] = [
    {
      id: "1",
      title: "YouTube",
      handle: "karanjoshi1206",
      socialLogo: "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
    },
    {
      id: "1",
      title: "Instagram",
      handle: "karanjoshi1206",
      socialLogo:
        "https://imgs.search.brave.com/xnRuOrM7QVyfzlQZ7NR8DmvRHMHJyHvv8TLZJBjAuus/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzQ1LzE4LzA3/LzM2MF9GXzc0NTE4/MDcxMF9DQ21aSVhv/RHFLRkhMUHh0Qndi/Vk1JRExLRkhTNUF3/cS5qcGc"
    }
  ];

  let activeSocial: TSocial | undefined = {
    id: "",
    title: "",
    handle: "",
    socialLogo: ""
  };

  let isOpen = false;

  const handleModal = (socialId?: string) => {
    isOpen = !isOpen;
    if (socialId) {
      activeSocial = socialList.find((item) => item.id === socialId);
    }
  };
</script>

<div class="social-list-container">
  {#each socialList as social}
    <SocialCard handleClick={handleModal} data={social} />
  {/each}

  <Modal modalProps={{ isOpen: isOpen, handleModal: handleModal, title: "Socials" }}>Hello</Modal>
</div>

<style>
  .social-list-container {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
</style>
