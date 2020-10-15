const duration = document.querySelectorAll('.duration__minutes');
const timer = document.querySelector('.control__element--time');
const replay = document.querySelector('.control__element--replay');
const play = document.querySelector('.control__element--play');
const progressLine = document.querySelector('.control__circle');
const video = document.querySelector('.video');
const firstSwitcherButton = document.querySelector('.switcher-video__video--first');
const secondSwitcherButton = document.querySelector('.switcher-video__video--second');
const sound = document.querySelector('.sound');

let isPlayed = false;
let isTimerActive = false;
let currentduration = 10;
let newTime = currentduration * 60000;
let interval;

const progressLength = progressLine.getTotalLength();
progressLine.style.strokeDasharray = progressLength;
progressLine.style.strokeDashoffset = progressLength;

duration.forEach((button) => {
  button.addEventListener('click', () => {
    const durationNumber = button.textContent.split(' ')[0];
    currentduration = durationNumber
    newTime = currentduration * 60000;
    const time = new Date(newTime);
    timer.textContent = `${time.getMinutes()}:${time.getSeconds()}`;
    progressLine.style.strokeDashoffset = progressLength;
  });
});

const updateTimer = () => {
  if (!isTimerActive) {
    interval = setInterval(() => {
      const time = new Date(newTime);
      timer.textContent = `${time.getMinutes()}:${time.getSeconds()}`;
      if (newTime === 0) {
        clearInterval(interval);
        isPlayed = false;
        sound.pause();
        video.pause();
        play.setAttribute('src', 'assets/svg/play.svg');
        newTime = currentduration * 60000;
        progressLine.style.strokeDashoffset = progressLength;
        isTimerActive = false;
      }
      if (isTimerActive) {
        const i = progressLength / (currentduration * 60 + 1);
        progressLine.style.strokeDashoffset -= i;
      }
      newTime -= 1000;
    }, 1000);
  } else {
    newTime = currentduration * 60000;
    const time = new Date(newTime);
    timer.textContent = `${time.getMinutes()}:${time.getSeconds()}`;
  }
  isTimerActive = true;
};

firstSwitcherButton.addEventListener('click', () => {
  isPlayed = true;
  play.setAttribute('src', 'assets/svg/pause.svg');
  sound.setAttribute('src', 'assets/sounds/rain.mp3');
  video.setAttribute('src', 'assets/video/rain.mp4');
  video.play();
  sound.play();
  progressLine.style.strokeDashoffset = progressLength;
  updateTimer();
});

secondSwitcherButton.addEventListener('click', () => {
  isPlayed = true;
  play.setAttribute('src', 'assets/svg/pause.svg');
  sound.setAttribute('src', 'assets/sounds/beach.mp3');
  video.setAttribute('src', 'assets/video/beach.mp4');
  video.play();
  sound.play();
  progressLine.style.strokeDashoffset = progressLength;
  updateTimer();
});

play.addEventListener('click', () => {
  isPlayed = !isPlayed;
  if (!isPlayed) {
    play.setAttribute('src', 'assets/svg/play.svg');
    video.pause();
    sound.pause();
    isTimerActive = false;
    clearInterval(interval);
  } else {
    play.setAttribute('src', 'assets/svg/pause.svg');
    video.play();
    sound.play();
    updateTimer();
  }
});

replay.addEventListener('click', () => {
  progressLine.style.strokeDashoffset = progressLength;
  updateTimer();
  const currentSound = sound.getAttribute('src');
  sound.setAttribute('src', currentSound);
  sound.play();
});
