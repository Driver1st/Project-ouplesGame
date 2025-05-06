let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

function createNumbersArray(count) {
    const numbers = [];
    for (let i = 1; i <= count; i++) {
        numbers.push(i, i);
    }
    return numbers;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createCardElement(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.number;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.number === secondCard.dataset.number) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === 16) {
            setTimeout(() => {
                document.getElementById('resetButton').style.display = 'block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function startGame(count) {
    const numbersArray = createNumbersArray(count);
    const shuffledArray = shuffle(numbersArray);

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    shuffledArray.forEach(number => {
        const card = createCardElement(number);
        gameContainer.appendChild(card);
    });

    matchedCards = 0;
    document.getElementById('resetButton').style.display = 'none'; // Скрываем кнопку
}

document.getElementById('resetButton').addEventListener('click', () => startGame(8));

startGame(8);

