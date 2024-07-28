document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const colors = [
        'red', 'red',
        'blue', 'blue',
        'green', 'green',
        'yellow', 'yellow',
        'purple', 'purple',
        'cyan', 'cyan',
        'orange', 'orange',
        'pink', 'pink'
    ];

    let shuffledColors = [];
    let selectedCards = [];
    let matchedPairs = 0;

    function shuffleColors() {
        shuffledColors = [...colors];
        for (let i = shuffledColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
        }
    }

    function createBoard() {
        shuffleColors();
        gameBoard.innerHTML = '';
        shuffledColors.forEach(color => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.color = color;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
            this.style.backgroundColor = this.dataset.color;
            this.classList.add('flipped');
            selectedCards.push(this);

            if (selectedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;
        if (card1.dataset.color === card2.dataset.color) {
            card1.classList.add('correct');
            card2.classList.add('correct');
            matchedPairs++;
            if (matchedPairs === colors.length / 2) {
                setTimeout(() => alert('You won!'), 500);
            }
        } else {
            setTimeout(() => {
                card1.style.backgroundColor = '#444';
                card2.style.backgroundColor = '#444';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }
        selectedCards = [];
    }

    restartButton.addEventListener('click', () => {
        matchedPairs = 0;
        createBoard();
    });

    createBoard();
});
