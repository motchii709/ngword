let words = [];

// words.txt を読み込んで配列にする
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  })
  .catch(error => {
    alert('単語の読み込みに失敗しました');
    console.error(error);
  });

const startScreen = document.getElementById('startScreen');
const wordScreen = document.getElementById('wordScreen');
const wordDisplay = document.getElementById('word');
const sound = document.getElementById('sound');

function startGame() {
  if (words.length === 0) {
    alert('単語リストが読み込まれていません');
    return;
  }

  startScreen.classList.remove('visible');
  wordScreen.classList.remove('visible');

  setTimeout(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = randomWord;
    wordScreen.classList.add('visible');

    setTimeout(() => {
      sound.play();
      wordScreen.classList.remove('visible');
      startScreen.classList.add('visible');
    }, 5000);
  }, 5000);
}

