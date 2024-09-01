<script lang="ts">
  type ModalProps = {
    isOpen: boolean;
    handleModal: (socialId?: string) => void;
    title: string;
  };

  const handleModal = () => {
    modalProps.handleModal();
  };

  export let modalProps: ModalProps;
</script>

<div class={`modal-container ${modalProps.isOpen ? "open" : ""}`}>
  <div class="modal-body">
    <div class="modal-header">
      <div class="modal-title">{modalProps.title}</div>
      <button on:click={handleModal} class="modal-close">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-content">
      <slot />
    </div>
  </div>
</div>

<style>
  /* Modal Container */
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  .modal-container.open {
    visibility: visible;
    opacity: 1;
  }

  /* Modal Body */
  .modal-body {
    background-color: #fff;
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: scale(0.95);
    transition: transform 0.3s ease;
  }

  .modal-container.open .modal-body {
    transform: scale(1);
  }

  /* Modal Header */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
  }

  /* Close Button */
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
    transition: color 0.3s ease;
  }

  .modal-close:hover {
    color: #333;
  }

  /* Modal Content */
  .modal-content {
    font-size: 1rem;
    color: #555;
  }
</style>
