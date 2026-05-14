const audio = 
document.querySelector("#audio");

const timerDisplay =
  document.querySelector("#timer");

const progressBar =
  document.querySelector("#progress-bar-fill");
console.log(progressBar);

const playPauseBtn = 
document.querySelector("#play-pause-btn");

const playPauseImg = 
document.querySelector("#play-pause-img");

const muteUnmuteButton = 
document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);
muteUnmuteButton.addEventListener("click", toggleAudio);

const muteUnmuteImg = 
document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

const restartButton = 
document.querySelector("#restart-button");


// Button Functions
function updateProgressBar() {
  const progress =
    ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width =
    `${progress}%`;
}

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
        startTimer();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    audio.pause();
        clearInterval(timerInterval);
    isRunning = false;
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

function toggleAudio() {
  if (audio.muted) {
    audio.muted = false;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";
  } else {
    audio.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}


restartButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  audio.pause();
  audio.currentTime = 0;
  audio.play();
  timeLeft = totalTime;
  updateTimerDisplay();
  updateProgressBar();
  isRunning = false;
  startTimer();
  playPauseImg.src =
    "https://img.icons8.com/ios-glyphs/30/pause--v1.png";

});

// I got the assistance of chatGPT to help me figure out how to make my restart button function properly so that it restarted both the timer and the audio. This is so users can properly restart their study timer if needed.

// Loop Audio
audio.loop = true;


// Timer
const totalTime = 60 * 60;
let timeLeft = totalTime;
let timerInterval = null;
let isRunning = false;


// Timer Display 
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
      updateProgressBar();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes =
    Math.floor(timeLeft / 60);
  const seconds =
    timeLeft % 60;
  timerDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
updateTimerDisplay();

// ChatGPT also assisted with the timer display and helped me make sure it was perfectly functioning. The timer will help users with tracking their progress. 