<script>
import {
    navigate
} from "svelte-routing";
import { token } from '../store/stores.js';
let username;
let password;
let error;

const handleUsername = (e) => {
    username = e.target.value
}
const handlePassword = (e) => {
    password = e.target.value
}

const login = async () => {
    const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
        credentials: "include"
    })

    if (res.status === 200) {
        navigate("/dashboard");
        localStorage.setItem('token', 'authorised');
        token.set(localStorage.getItem('token'));
    } else {
        error = 'Invalid login credentials.'
    }
}

const handleSubmit = (e) => {
    login()
}
</script>

<main>
    <div class="loginContainer">
        <h2>Welcome to <span class="title">Highscores</span>!</h2>
        <form on:submit|preventDefault={handleSubmit} class="loginForm">
            <input type="text" id="username" placeholder="Username" on:change={handleUsername} required><br>
            <input type="password" id="password" placeholder="Password" on:change={handlePassword} required><br><br>
            <input type="submit" value="Login" id="loginBtn">
        </form>

        <div>
            {#if error}
            <p class="error">{error}</p>
            {/if}
        </div>
    </div>
</main>

<style>
:root {
    --hoverColorBg: #2cb630;
    --hoverColor: whitesmoke;
    --error: red;
}

.loginContainer {
    margin: 30vh auto;
    width: 30vw;
    min-width: 250px;
    max-width: 600px;
    text-align: center;
}

.loginContainer h2 {
    text-align: left;
}

.loginForm input {
    height: 40px;
    margin: 15px 0px;
    border-radius: 8px;
    padding-left: 10px;
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
}

#loginBtn {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    background-color: #ccc;
}

#loginBtn:hover {
    color: var(--hoverColor);
    background-color: var(--hoverColorBg);
    transition: 0.2s;
}

.error {
    color: var(--error);
    font-size: 18px;
}
</style>
