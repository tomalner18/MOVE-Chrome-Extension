// called in break.html.

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
      startTimer(end, display);
  });
  
};

/* Reschedule */

function openBreakWindow() {
  chrome.windows.create({
    url: "break.html",
    type: "popup",
    width: 436,  /*Add 16 to desired size? */
    height: 300
  });
}

function setAlarm() {
  // Cancel the break alarm.
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  chrome.storage.local.set({timer: false} , function (){
    console.log("Storage Succesful");
  });

  let minutes = parseFloat(document.getElementById("study-time").value);
  let pause = parseFloat(document.getElementById("break-time").value);
  chrome.storage.local.set({'pausetime': pause}, function (){
    console.log("Storage Succesful");
  });

  // immediately start the work session
  chrome.storage.local.set({timer: true, break: false, paused: false}, function() {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: 'green'})
    var endtime = Date.now() + 1000 * 60 * minutes;
    chrome.alarms.create("Sch", {when: endtime});
    chrome.storage.local.set({minutes: minutes, endtime: endtime});

    // when the new work session starts, pressing the chrome extension icon should open you popup.html, with the countdown showing.
    chrome.browserAction.onClicked.removeListener(openBreakWindow);
    chrome.browserAction.setPopup({popup: "./popup.html"});
    
    window.close();
  });
}
  
function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  chrome.storage.local.set({timer: false} , function (){
    console.log("Storage Succesful");});
  window.close();
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('create-solo').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);   