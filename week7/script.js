// Global variables to track game state
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 2;

// Function to check if two cards match
function checkMatch(card1, card2) {
    const symbol1 = card1.querySelector('.card-back').textContent;
    const symbol2 = card2.querySelector('.card-back').textContent;
    return symbol1 === symbol2;
}

// Function to handle card flip with parameter for card element
function handleCardClick(card) {
    // Prevent flipping if already flipped or two cards are flipped
    if (card.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
    }

    // Add flipped class to trigger CSS animation
    card.classList.add('flipped');
    flippedCards.push(card);

    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (checkMatch(firstCard, secondCard)) {
            matchedPairs++;
            flippedCards = [];
            checkGameOver();
        } else {
            // Flip cards back after delay if no match
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// Function to check if game is over
function checkGameOver() {
    if (matchedPairs === totalPairs) {
        showModal('Congratulations! You won the game!');
    }
}

// Function to show modal with message parameter
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Function to reset game state
function resetGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
    matchedPairs = 0;
    document.getElementById('modal').style.display = 'none';
}

// Event listeners
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
});

document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('closeModal').addEventListener('click', resetGame);