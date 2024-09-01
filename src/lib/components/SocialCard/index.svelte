<script lang="ts">
    type PageData = {
        title: string;
        handle: string;
        socialLogo: string;
        id: string;
    };

    type handleSocial = (socialId:string) => void;

    const handleQrCode = ()=>{
        handleClick(data.id)
    }

    export let data: PageData;
    export let handleClick: handleSocial;
</script>

<div class="social-card">
    <img src={data.socialLogo} alt="Logo" class="social-card-logo" />
    <div class="social-card-content">
        <div class="social-card-title">{data.title}</div>
        <div class="social-card-subtitle">@{data.handle}</div>
    </div>
    <img
        on:click={handleQrCode}
        src="https://imgs.search.brave.com/eAVtMeJPQGhQSe7BMnZ1KIfuCbRfJFnbOWKHP0dA8NU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGlnaHRlbnBpYy5w/cm8vaW1hZ2VzL3Fy/LWV4YW1wbGUuYXZp/Zg"
        alt="QR Code"
        class="social-card-qr"
    />
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
        width: 400px; /* Adjust width as needed */
    }

    .social-card-logo {
        width: 60px; /* Adjust size as needed */
        height: 60px; /* Adjust size as needed */
        margin-right: 16px;
        border-radius: 50%;
        /* object-fit: contain; */
        mix-blend-mode: darken;
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

    .social-card-qr {
        width: 24px; /* Adjust size as needed */
        height: 24px; /* Adjust size as needed */
        margin-left: 16px;
    }
</style>
