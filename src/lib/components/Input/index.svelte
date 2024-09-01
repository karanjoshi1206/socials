<script lang="ts">
    type InputProps = {
        label:string,
        handleSocialSubmit:(e:any)=>void,
    }

    export let inputProps:InputProps;
    export let socialHandle:string
</script>

<div class="input-container">
  <input type="text" id="input-field" placeholder="" bind:value={socialHandle} />
  <label for="input-field" class="input-label">{inputProps.label}</label>
</div>

<style>
  .input-container {
    position: relative;
    width: 100%;
    /* max-width: 300px; */
  }

  #input-field {
    width: 100%;
    padding: 10px 16px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  #input-field:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  .input-label {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    background-color: white;
    padding: 0 5px;
    font-size: 16px;
    color: #999;
    pointer-events: none;
    transition:
      top 0.3s ease,
      font-size 0.3s ease,
      color 0.3s ease;
  }

  #input-field:focus + .input-label,
  #input-field:not(:placeholder-shown) + .input-label {
    top: 0;
    font-size: 12px;
    color: #007bff;
  }
</style>
