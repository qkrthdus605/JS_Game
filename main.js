const CARROT_SIZE = 80;

const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 5

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect()

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// 게임의 상태
let started = false
let score = 0
let timer = undefined

gameBtn.addEventListener('click', ()=>{
  console.log('click')
  if(started){
    stopGame()
  }else{
    startGame()
  }
  started = !started
})

function stopGame(){

}

function startGame(){
  field.innerHTML='' // 게임이 시작하면 처음 값을 빈값으로
  gameScore.innerHTML = CARROT_COUNT; 
  initGame();
  showStopButton()
  showTimeAndScore()
  startGameTimer()
}

function showTimeAndScore(){
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function showStopButton(){
  const icon = document.querySelector('.fas');
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play');
}

function startGameTimer(){
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(()=>{
    if(remainingTimeSec <= 0){
      clearInterval(timer)  //undefined
      return
    }
    updateTimerText(--remainingTimeSec);
  },1000)
}

function updateTimerText(time){
  const minute = Math.floor(time/60)
  const second = time % 60
  gameTimer.innerHTML = `${minute}:${second}`;
}

function initGame(){
  console.log(fieldRect);
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath){
  const x1=0;
  const y1=0;
  const x2=fieldRect.width - CARROT_SIZE;
  const y2=fieldRect.height - CARROT_SIZE;

  for(let i = 0; i < count; i++){
    const item = document.createElement('img');
    item.setAttribute('class', className)
    item.setAttribute('src', imgPath)
    item.style.position = 'absolute';

    const x = randomNumber(x1, x2)
    const y = randomNumber(y1, y2)

    item.style.left = `${x}px`
    item.style.top = `${y}px`

    field.appendChild(item)
  }
}

function randomNumber(min, max){
  return Math.random() * (max-min) + min;
}

