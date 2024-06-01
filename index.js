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
    navigator.vibrate(200); 

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
    navigator.vibrate(200); 
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
    navigator.vibrate(200);  
    isRunning = true;
})

pauseBtn.addEventListener("click" , ()=>{
    clearInterval(interval);
    isRunning = false;
    navigator.vibrate(200); 
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
const keepScreenOn = async () => {
    const wakeLock = await navigator.wakeLock.request("screen");
}

function releaseScreen(){
    await.wakeLock.release();
}






/*
reset button = bulunan aşamanın dakikasını resetler
eğer en başa dönülmek isteniyorsa sayfa yenilenir
*/


