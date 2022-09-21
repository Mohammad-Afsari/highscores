<script>
import Profile from "./Profile.svelte";
import Bar from "./Bar.svelte";
import Highscores from "./Highscores.svelte";
import {
    get
} from 'svelte/store'

let nickname;
let score;
let hs;

const handleNickname = (e) => {
    nickname = e.target.value
}

const handleScore = (e) => {
    score = +e.target.value
}

const postScore = async () => {
    const res = await fetch('http://localhost:8080/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickname: nickname,
            score: score
        }),
        credentials: "include"
    })
}

const handleSubmit = (e) => {
    postScore();
    hs.getScores();
    e.target.reset();
}
</script>

<main>
    <Bar />
    <div class="scoreContainer">
        <Profile />
        <h2> Please post a highscore.</h2>
        <form on:submit|preventDefault={handleSubmit} class="scoreForm">
            <input type="text" id="nickname" placeholder="Nickname" on:change={handleNickname} required><br>
            <input type="number" id="score" placeholder="Score" on:change={handleScore} min="1" max="1000" required><br><br>
            <input type="submit" id="scoreBtn" value="Score">
        </form>

    </div>
    <Highscores bind:this={hs} />
</main>

    <style>
.scoreContainer {
    text-align: left;
    width: 40vw;
    min-width: 250px;
    max-width: 600px;
    margin: 0 auto;
}

#nickname,
#score {
    height: 40px;
    width: 100%;
    margin-top: 10px;
    font-size: 18px;
    border-radius: 8px;
    padding-left: 10px;
}

input {
    width: 100%;
    margin: 2px 0;
    display: inline-block;
    border-radius: 8px;
    box-sizing: border-box;
}

#scoreBtn {
    width: 100%;
    height: 40px;
    background-color: #ccc;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    border-radius: 8px;
}

#scoreBtn {
    cursor: pointer;
}

#scoreBtn:hover {
    background-color: #2cb630;
    color: whitesmoke;
    transition: 0.2s;
}
</style>
