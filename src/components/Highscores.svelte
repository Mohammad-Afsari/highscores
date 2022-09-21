<script>
let onlymine = ''
let mineResp = 'All'
let allScores = []

export const getScores = async () => {
    const res = await fetch(`http://localhost:8080/scores?${onlymine}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const scoreData = await res.json()
    allScores = [...scoreData.scores]
}

const toggleMine = (e) => {
    onlymine = onlymine ? '' : 'onlymine'
    mineResp = onlymine === '' ? 'All' : 'Mine'
    getScores()
}

const initialise = (() => {
    getScores();
})()
</script>

<div class="highscoreContainer">
    <div class="result">
        <h1 class="resultsHeader">Highscores</h1>
        <div class="switchContainer">
            <div>{mineResp}</div>
            <div>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider round" on:click={toggleMine}></span>
                </label></div>
        </div>
    </div>
    <div class="results">
        {#each allScores as allScores}
        <div class="allScores">
            <h2>{allScores.rank}. {allScores.nickname}</h2>
            <h2>{allScores.score}</h2>
        </div>
        {/each}
    </div>
</div>

<style>
:root {
    --generalTheme: whitesmoke;
    --scoresColorBg: #333;
    --switchContainer: orange;
    --switchColor: #ccc;
    --switchActiveColor: #2196F3;
}

.highscoreContainer {
    text-align: left;
    width: 40vw;
    min-width: 250px;
    max-width: 600px;
    margin: 0 auto;
}

/* =============
    List of scores
    ===============*/
.result {
    display: flex;
    margin: 40px auto;
    justify-content: space-between;
}

.resultsHeader {
    text-decoration: underline;
}

.results {
    overflow: auto;
    height: 50vh;
    width: 40vw;
    min-width: 250px;
    max-width: 600px;
    margin: 40px auto;
}

.allScores {
    display: flex;
    width: 35vw;
    min-width: 220px;
    max-width: 500px;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 10px;
    border: 1px solid var(--generalTheme);
    border-radius: 10px;
    background-color: var(--scoresColorBg);
}

/* =============
    Switch / Slider
    ===============*/
.switchContainer {
    font-weight: bold;
    color: var(--switchContainer);
    text-align: center;
}

.switchContainer div {
    font-size: 18px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--switchColor);
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: var(--switchActiveColor);
}

input:focus+.slider {
    box-shadow: 0 0 1px var(--switchActiveColor);
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
