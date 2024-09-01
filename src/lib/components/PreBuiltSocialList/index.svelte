<script lang="ts">
  import { SOCIALS } from "$lib/contants/socials";
  import NewSocialCard from "$lib/components/NewSocialCard/index.svelte";
  import Modal from "$lib/components/Modal/index.svelte";
  import Input from "$lib/components/Input/index.svelte";
  import Button from "$lib/components/Button/index.svelte";
  import type { TNewSocial, TSocial } from "$lib/types/socials";
  // import { env } from '$lib/env'
  import { onMount } from "svelte";

  let isOpen = false;
  let selectedSocial: TNewSocial | undefined = undefined;
  const BASE_URL = 'http://localhost:3000/'


  const handleModal = (socialId?: string) => {
    isOpen = !isOpen;
    if (socialId) {
      selectedSocial = SOCIALS.find((item) => item.socialId === socialId);
    }
  };

  const handleSocialSubmit = (e: any) => {};

  let socialHandle = "";
  let socials:any = []

  const fetchSocials = async () => {
    const response = await fetch(`${BASE_URL}socials/getDefault`);
    const result = await response.json();
    socials = result
    console.log("RESULT IS ",socials)
  };

  onMount(async () => {
    fetchSocials()
  })
</script>

<div class="social-list-container">
  
    {#each socials as social}
      <NewSocialCard handleClick={handleModal} {social} />
    {/each}


  <Modal modalProps={{ isOpen: isOpen, handleModal: handleModal, title: `Add your ${selectedSocial?.title || "Social"} details` }}>
    <Input
      inputProps={{
        label: `${selectedSocial?.title} ${selectedSocial?.title?.toLowerCase() === "whatsapp"? 'Number' : 'Handle'}`,
        handleSocialSubmit
      }}
      bind:socialHandle
    />

    <div class="btn-group">

      <Button handleClick={handleSocialSubmit} />
    </div>
  </Modal>
</div>

<style>
  .social-list-container {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .btn-group{
    margin: 8px 0;
  }
</style>
