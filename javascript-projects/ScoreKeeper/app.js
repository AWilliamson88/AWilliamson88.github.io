
const resetBtn = document.querySelector('#reset');
const scoreSelector = document.querySelector('#maxscore-select');

let isPlaying = true;
let maxScore = parseInt(scoreSelector.value);

const p1 = {
    score: 0,
    button: document.querySelector('#p1btn'),
    display: document.querySelector('#score1')
}


const p2 = {
    score: 0,
    button: document.querySelector('#p2btn'),
    display: document.querySelector('#score2')
}

function addScore(player, challenger) {
    if (isPlaying) {
        player.score += 1;
        player.display.innerText = player.score;

        if (player.score === maxScore) {
            isPlaying = false;
            player.display.classList.add('has-text-success');
            challenger.display.classList.add('has-text-danger');
            player.button.disabled = true;
            challenger.button.disabled = true;
        }
    }
}

p1.button.addEventListener('click', function () {
    addScore(p1, p2);
})

p2.button.addEventListener('click', function () {
    addScore(p2, p1);
})

resetBtn.addEventListener('click', function () {
    isPlaying = true;
    resetPlayer(p1);
    resetPlayer(p2);
})

function resetPlayer(player) {
    player.score = 0;
    player.display.innerText = player.score;
    player.display.classList.remove('has-text-success', 'has-text-danger');
    player.button.disabled = false;
}

scoreSelector.addEventListener('change', function () {
    maxScore = parseInt(this.value);
    console.log(this);
})