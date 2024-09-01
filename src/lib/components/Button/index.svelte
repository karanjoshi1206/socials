<script lang="ts">
  type onClick = (e:any) => void;

  export let handleClick:onClick;
</script>

<button on:click={(e)=>handleClick(e)} class="button"> Click Me </button>

<style>
  .button {
    background-color: #1da1f2; /* Customize color as needed */
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #1a91da;
  }
</style>
