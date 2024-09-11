<script>
    import googleLogo from "$lib/images/google_logo.png"
    export let form;
</script>
    
<div class="sign-in-wrapper">
    <div class="sign-in-content">
        <h2>Join Socials</h2>
        <form class="auth-form" method="post" action="?/OAuth2">
            <div>
                <button class="btn-auth" type="submit">
                    <img class="btn-auth-img" src={googleLogo} alt='google sign in'/>
                    <span>Sign-In with Google</span>
                </button>
            </div>
        </form>
        <!-- <form action="?/oauth2">
            <button type="submit" class="btn-secondary">Sign In</button>
        </form> -->
    </div>
</div>

<style>
    /* Root styles for color and typography */
    :root {
        --primary-color: #4a90e2;
        --secondary-color: #333;
        --bg-color: #f7f7f7;
        --btn-bg-color: #ffffff;
        --btn-hover-bg-color: #f0f0f0;
        --text-color: #000;
        --font-family: 'Roboto', sans-serif;
    }

    body {
        font-family: var(--font-family);
        background-color: var(--bg-color);
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    h2 {
        color: var(--primary-color);
        margin-bottom: 1em;
    }

    .sign-in-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }

    .sign-in-content {
        max-width: 400px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .auth-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    button {
        width: 100%;
        padding: 10px 20px;
        border: 0;
        border-radius: 5px;
        background-color: var(--btn-bg-color);
        color: var(--secondary-color);
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 8px;
    }

    button:hover {
        background-color: var(--btn-hover-bg-color);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .btn-auth {
        background-color: transparent;
        display: flex;
        align-items: center;
        gap: 8px;

    }

    .btn-auth-img {
        height: 30px;
        width: 30px;
        object-fit: cover;
        border-radius: 5px;
    }

    .btn-auth-img:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
        margin-top: 1em;
        background-color: var(--primary-color);
        color: #fff;
    }

    .btn-secondary:hover {
        background-color: darken(var(--primary-color), 10%);
    }
</style>
