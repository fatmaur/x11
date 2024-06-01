let startingMinutes = 11;
let timeInSeconds = startingMinutes * 60;

var isRunning = false;

const resetBtn = document.querySelector("#reset");
const pauseBtn = document.querySelector("#pause");
const startBtn = document.querySelector("#start");
const nextBtn = document.querySelector("#next");
const stageTitle = document.querySelector(".stage")

const countDown = document.querySelector(".count");

countDown.innerHTML = startingMinutes + ":00"

//butonlar
resetBtn.addEventListener("click", ()=>{
    timeInSeconds = startingMinutes * 60;
    countDown.innerHTML = startingMinutes + ":00"
    clearInterval(interval);
    isRunning = false;
    vibratePhone(150); 
    releaseScreen();
})

nextBtn.addEventListener("click" , ()=> {
    if(startingMinutes != 99){
        startingMinutes = startingMinutes + 11;
        timeInSeconds = startingMinutes * 60;
        
        countDown.innerHTML = startingMinutes + ":00"
        stageTitle.innerHTML = startingMinutes / 11;
    }

    clearInterval(interval);
    isRunning = false;
    vibratePhone(150); 
    releaseScreen();
})

startBtn.addEventListener("click" , ()=> {
    if(isRunning === false){
        updateTime();
        interval = setInterval(function(){
        updateTime();
        if(timeInSeconds === 0){
            clearInterval(interval);
            navigator.vibrate(500 , 200 , 300); //oturum bitti, titreşim
        }
    } , 1000)
    }
    
    keepScreenOn();
    vibratePhone(150);  
    isRunning = true;
})

pauseBtn.addEventListener("click" , ()=>{
    clearInterval(interval);
    isRunning = false;
    vibratePhone(150); 
    releaseScreen();
})


//zaman güncelleme fonksiyonu
function updateTime(){
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    countDown.innerHTML = minutes + ":" + seconds;
    timeInSeconds--;
}

//screen sleep i enable etmek için
let wakeLock;
async function keepScreenOn(){
    wakeLock = await navigator.wakeLock.request("screen");
}

//screen sleep disabling
async function releaseScreen(){
    await wakeLock.release();
}

//vibratasyon
function vibratePhone(miliseconds){
    navigator.vibrate(miliseconds);
}

/*
reset button = bulunan aşamanın dakikasını resetler
eğer en başa dönülmek isteniyorsa sayfa yenilenir
*/


