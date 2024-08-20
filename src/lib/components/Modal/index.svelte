<script lang="ts">
    type ModalProps = {
        isOpen: boolean;
    };

    export let modalProps: ModalProps;
</script>

<div class={`modal-container ${modalProps.isOpen ? "open" : ""}`}>
    <div class="modal-body">
        <div class="modal-header">
            <div class="modal-title">Title</div>
            <div class="modal-close">Close</div>
        </div>
    </div>
</div>

<style>
    .modal-container {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.434);
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: grid;
        place-items: center;
        display: block;
    }
    .modal-container.open {
        display: block;
    }
    .modal-body {
        background-color: white;
        width: 500px;
        height: 200px;
        border-radius: 4px;
        padding: 4px;
    }
</style>
