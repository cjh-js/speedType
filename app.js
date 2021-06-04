const levelMenu = document.querySelector('.level-wrap');
const toggleBtn = document.querySelector('.toggle');
const levelSelect = document.querySelector('#level-select');
const typeInput = document.querySelector('.typing');
const wordShowing = document.querySelector('.word');
const scoreShowing = document.querySelector('.score');
const timeShowing = document.querySelector('.clock');
const onGame = document.querySelector('.on-game');
const outGame = document.querySelector('.out-game');
const resultScore = document.querySelector('.result');
const reGameBtn = document.querySelector('.reGame');

// Words
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

// Initial Settings
let time = 10;
let score = 0;
let randomWord;

let level =
    localStorage.getItem('level') !== null
        ? localStorage.getItem('level')
        : 'medium';
    
levelSelect.value =
    localStorage.getItem('level') !== null
        ? localStorage.getItem('level')
        : 'medium';

const timeInterval = setInterval(updateTime, 1000);

// Generate a Word
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

// Showing Word
function showingWord(){
    randomWord = getRandomWord();
    wordShowing.innerText = randomWord;
}

// Update
function updateScore(){
    score++;
    scoreShowing.innerText = score;
}

function updateTime(){
    time--;
    timeShowing.innerText = `${time}s`;

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

// Game Over
function gameOver() {
    onGame.classList.add('hide');
    resultScore.innerText = score;
    outGame.classList.add('show');
}

// Event Listener
toggleBtn.addEventListener('click', () => {
    levelMenu.classList.toggle('showing');
});

levelSelect.addEventListener('change', e => {
    const levelValue = e.target.value;
    localStorage.setItem('level', levelValue);
});

typeInput.addEventListener('input', e => {
    const answer = e.target.value;

    if(answer === randomWord){
        showingWord();
        updateScore();

        e.target.value = '';

        if(level === 'hard'){
            time += 2;
        } else if(level === 'medium'){
            time += 3;
        } else{
            time += 5;
        }
        updateTime();
    }
});

reGameBtn.addEventListener('click', () => {
    location.reload();
});

showingWord();
typeInput.focus();