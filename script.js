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
const countdownDisplay = document.getElementById('countdown');
const wordsContainer = document.getElementById('wordsContainer');
const sound = document.getElementById('sound');
const numWordsSlider = document.getElementById('numWords');
const numWordsDisplay = document.getElementById('numWordsDisplay');

numWordsSlider.addEventListener('input', () => {
  numWordsDisplay.textContent = numWordsSlider.value;
});

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
  const numWords = parseInt(numWordsSlider.value);
  const selectedWords = [];

  // ランダムに選んだ単語を配列に格納
  while (selectedWords.length < numWords) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    if (!selectedWords.includes(randomWord)) {
      selectedWords.push(randomWord);
    }
  }

  // 表示する単語をcontainerに追加
  wordsContainer.innerHTML = selectedWords.join('<br>');

  wordScreen.classList.add('visible');
  setTimeout(() => {
    sound.play(); // 音を鳴らす
    startWordDisappearCountdown(); // お代が消えるカウントダウンを開始
  }, 5000); // 5秒後に音を鳴らして次の画面へ
}

function startWordDisappearCountdown() {
  let disappearTime = 5;
  const disappearInterval = setInterval(() => {
    disappearTime--;
    if (disappearTime === 0) {
      clearInterval(disappearInterval);
      wordScreen.classList.remove('visible'); // お代の画面を消す
    }
  }, 1000);
}
