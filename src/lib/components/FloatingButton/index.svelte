<script lang="ts">
    type onClick=()=>void
    export let handleClick:onClick;
</script>
<button on:click={handleClick} class="floating-button">
    <div class="floating-icon">
        +
    </div>
</button>

<style>
    .floating-button{
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: none;
        border: none;
    }
    .floating-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: orange;
        font-size: 32px;
        color: white;
        cursor: pointer;
        transition: all 0.5s ease;
    }
    .floating-icon:hover{
        transform: rotate(360deg);
    }
</style>