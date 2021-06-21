function setAlarm() {
  let minutes = parseFloat(document.getElementById("study-time").value);
  let pause = parseFloat(document.getElementById("break-time").value);
  chrome.storage.local.set({'pausetime': pause}, function (){
    console.log("Storage Succesful");
  });
  chrome.storage.local.set({timer: true, break: false});
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.browserAction.setBadgeBackgroundColor({color: 'green'})
  chrome.alarms.create({when: Date.now() + 1000 * 60 * minutes});
  var endtime = Date.now() + 1000 * 60 * minutes;
  chrome.storage.local.set({minutes: minutes, endtime: endtime});
  window.close();
}

// same implementation as the one in countdown.js
function startTimer(duration, display) {
  var timer = duration; 
  var minutes; 
  var seconds;
  var id = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + " mins " + seconds + " s to next break.";

      if (--timer < 0) {
          timer = duration;
          clearInterval(id);
      }
  }, 1000);
}
  
function clearAlarm() {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.alarms.clearAll();
    chrome.storage.local.set({timer: false} , function (){
      console.log("Storage Succesful");});
    window.close();
}

function clearTabs() {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
}

function openHome() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("home-page").style.display = "grid";
  var y = document.getElementById("home-btn");
  y.classList.add("active")
}

function openWorkingHome() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("home-page-when-working").style.display = "grid";
  var y = document.getElementById("home-btn");
  y.classList.add("active")
}

function openStat() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("stat-page").style.display = "grid";
  var y = document.getElementById("stat-btn");
  y.classList.add("active")
}

function openCalendar() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("calendar-page").style.display = "grid";
  var y = document.getElementById("calendar-btn");
  y.classList.add("active");
}

function openSocial() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("social-page").style.display = "grid";
  var y = document.getElementById("social-btn");
  y.classList.add("active")
}

function openMore() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("more-page").style.display = "grid";
  var y = document.getElementById("more-btn");
  y.classList.add("active")
}

function iniNav() {

  chrome.storage.local.get("timer", function (result) {
    if (result.timer) {
      document.getElementById('home-btn').addEventListener('click', openWorkingHome);
    } else {
      document.getElementById('home-btn').addEventListener('click', openHome);
    }
  });

  document.getElementById('stat-btn').addEventListener('click', openStat);
  document.getElementById('calendar-btn').addEventListener('click', openCalendar);
  document.getElementById('social-btn').addEventListener('click', openSocial);
  document.getElementById('more-btn').addEventListener('click', openMore);
}

function displayWorkingHomePage() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("home-page-when-working").style.display = "grid";

  chrome.extension.getBackgroundPage().console.log("just opened working home page:");
  chrome.extension.getBackgroundPage.console.log(document.querySelector('#countdown'));
}
  
//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
iniNav();
document.getElementById('create-solo').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('cancelAlarm2').addEventListener('click', clearAlarm);

// if the user is currently in the middle of a work session, then the default page of the popup should be the home-page-when-working one.
chrome.storage.local.get("timer", function (result) {
  if (result.timer) {
    displayWorkingHomePage();
  }
});

// starting the countdown when the user has just started a work session.
window.onload = function () {
  chrome.storage.local.get(["timer", "endtime"], function (result) {
    if (result.timer) {
      var display = document.querySelector('#countdown');
      var end = (result.endtime - Date.now())/1000;

      startTimer(end, display);
    }
  });
};
