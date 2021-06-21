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

function setAlarm() {
  let minutes = parseFloat(document.getElementById("study-time").value);
  let pause = parseFloat(document.getElementById("break-time").value);
  chrome.storage.local.set({'pausetime': pause}, function (){
    console.log("Storage Succesful");
  });
  chrome.storage.local.set({timer: true, break: true}, function() {
  chrome.browserAction.setBadgeText({text: 'SCH'});
  chrome.browserAction.setBadgeBackgroundColor({color: 'purple'})
  chrome.storage.local.get(['timerend'], function(result) {
      chrome.alarms.create("Sch", {when: result.timerend + 1000 * 60 * minutes});
      chrome.storage.local.set({minutes: minutes});
      window.close(); 
      });
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