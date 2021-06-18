function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var id = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (--timer < 0) {
            timer = duration;
            clearInterval(id);
        }
    }, 1000);


  }
  
  window.onload = function () {
    chrome.storage.local.get(['timerend'], function(result) {
        var display = document.querySelector('#time'), end = (result.timerend - Date.now())/1000;
        chrome.extension.getBackgroundPage().console.log(display.textContent);
        startTimer(end, display);
    });
    
  };