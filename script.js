const cards = [
    '🐘', '🐘',
    '🦁', '🦁',
    '🐼', '🐼',
    '🦒', '🦒',
    '🐍', '🐍',
    '🦜', '🦜',
    '🐢', '🐢',
    '🦓', '🦓',
    '🐳', '🐳',
    '🦊', '🦊',
    '🐧', '🐧', 
    '🐸', '🐸',
    '🐨', '🐨',
    '🦔', '🦔',
    '🦘', '🦘',
    '🦥', '🦥',
    '🦦', '🦦',
    '🦩', '🦩'
  ];
  
  let flippedCards = [];
  let matchedPairs = 0;
  let timeLeft = 90;
  const timerElement = document.getElementById('timer');
  const gameBoard = document.getElementById('gameBoard');
  const startButton = document.getElementById('startButton');
  const restartButton = document.getElementById('restartButton');
  let timerInterval;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function startGame() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.animal = card;
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
    });
    matchedPairs = 0;
    timeLeft = 90;
    startButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    timerElement.classList.remove('hidden');
    gameBoard.classList.remove('hidden');
    startTimer();
  }
  
  function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('guessed')) return;
  
    this.classList.add('flipped');
    this.textContent = this.dataset.animal;
    flippedCards.push(this);
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.dataset.animal === card2.dataset.animal) {
      // Marcar las cartas adivinadas como "adivinadas", pero NO hacerlas desaparecer
      card1.classList.add('guessed');
      card2.classList.add('guessed');
      // No agregamos 'hidden', así que las cartas se mantienen visibles
      matchedPairs++;
  
      if (matchedPairs === cards.length / 2) {
        clearInterval(timerInterval);
        alert('¡Felicidades! Has ganado el juego.');
        restartButton.classList.remove('hidden');
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
      }, 1000);
    }
  
    flippedCards = [];
  }
  
  function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        revealAllCards();
        alert('Se acabó el tiempo. ¡Intenta de nuevo!');
        restartButton.classList.remove('hidden');
      }
    }, 1000);
  }
  
  function revealAllCards() {
    const allCards = document.querySelectorAll('.card:not(.hidden)');
    allCards.forEach(card => {
      card.classList.add('flipped');
      card.textContent = card.dataset.animal;
    });
  }
  
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', () => {
    startButton.classList.remove('hidden');
    timerElement.classList.add('hidden');
    gameBoard.classList.add('hidden');
    restartButton.classList.add('hidden');
  });
  