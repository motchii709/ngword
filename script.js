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
const countdownScreen = document.getElementById('countdownScreen');
const wordScreen = document.getElementById('wordScreen');
const showScreen = document.getElementById('showScreen');
const countdownDisplay = document.getElementById('countdown');
const wordDisplay = document.getElementById('word');
const sound = document.getElementById('sound');

function startGame() {
  if (words.length === 0) {
    alert('単語リストが読み込まれていません');
    return;
  }

  startScreen.classList.remove('visible');
  countdownScreen.classList.add('visible');
  let countdown = 5;
  countdownDisplay.textContent = countdown;

  // カウントダウン処理
  const countdownInterval = setInterval(() => {
    countdown--;
    countdownDisplay.textContent = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownScreen.classList.remove('visible');
      setTimeout(showWordScreen, 1000); // 1秒後に単語表示
    }
  }, 1000);
}

function showWordScreen() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = randomWord;
  wordScreen.classList.add('visible');
  setTimeout(() => {
    sound.play(); // 音を鳴らす
    wordScreen.classList.remove('visible');
    showScreen.classList.add('visible');
    startWordDisappearCountdown(); // お代が消えるカウントダウンを開始
  }, 5000); // 5秒後に音を鳴らして次の画面へ
}

function startWordDisappearCountdown() {
  let disappearTime = 5;
  const disappearInterval = setInterval(() => {
    disappearTime--;
    if (disappearTime === 0) {
      clearInterval(disappearInterval);
      showScreen.classList.remove('visible');
    }
  }, 1000);
}
