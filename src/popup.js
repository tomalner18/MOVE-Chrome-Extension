function setAlarm() {
  let minutes = parseFloat(document.getElementById("study-time").value);
  let pause = parseFloat(document.getElementById("break-time").value);
  chrome.storage.local.set({ 'pausetime': pause }, function () {
    console.log("Storage Succesful");
  });
  chrome.storage.local.set({ timer: true, break: false, paused: false });
  chrome.browserAction.setBadgeText({ text: 'ON' });
  chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
  var endtime = Date.now() + 1000 * 60 * minutes;
  chrome.alarms.create({ when: endtime });
  chrome.storage.local.set({ minutes: minutes, endtime: endtime });
  window.close();
}

// a global variable to start & stop countdowns.
var countdown_id;

// same implementation as the one in countdown.js
function startTimer(duration, display) {
  var timer = duration;
  var minutes;
  var seconds;
  countdown_id = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + " mins " + seconds + " s to next break";

    if (--timer < 0) {
      timer = duration;
      clearInterval(countdown_id);
    }
  }, 1000);
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  chrome.storage.local.set({ timer: false }, function () {
    console.log("Storage Succesful");
  });
  window.close();
}

function pauseAlarm() {
  chrome.storage.local.get(["endtime"], function (result) {
    var durationLeft = (result.endtime - Date.now()) / 1000;
    chrome.extension.getBackgroundPage().console.log("durationLeft: " + durationLeft);
    chrome.storage.local.set({ durationLeft: durationLeft, paused: true }, function () {
      console.log("Storage Succesful");

      // stop the countdown and freeze it.
      clearInterval(countdown_id);
      chrome.alarms.clearAll();

      // Replace the pause button with the continue one.
      document.getElementById('pause').style.display = 'none';
      document.getElementById('continue').style.display = '';

      chrome.browserAction.setBadgeText({ text: 'PAUSED' });
      chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
    });
  });
}

// continue from a paused alarm.
function continueAlarm() {
  chrome.storage.local.get("durationLeft", function (result) {
    var endtime = Date.now() + (1000 * result.durationLeft);
    chrome.alarms.create({ when: endtime });
    chrome.storage.local.set({ endtime: endtime, paused: false });

    chrome.browserAction.setBadgeText({ text: 'ON' });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });

    window.close();
  })
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
  fetch('https://moveimperial.herokuapp.com/api/todos/')
.then(res => res.json())
.then((res) => {
  const data = res.data;
  var shareInfoLen = Object.keys(res).length;
  console.log(shareInfoLen);
  var count = 0;
  for (let i = shareInfoLen-1; i >= 0, count < 4; i--){
    if (res[i].completed) {continue;}
    count++;
    if (count == 1) {console.log(res[i]); getElement('l1').innerHTML =  res[i].title;}
    if (count == 2) {getElement('l2').innerHTML =  res[i].title;}
    if (count == 3) {getElement('l3').innerHTML =  res[i].title;}
    if (count == 4) {getElement('l4').innerHTML =  res[i].title;}


  }
});
}

function openCalendar() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("calendar-page").style.display = "grid";
  var y = document.getElementById("calendar-btn");
  y.classList.add("active");
  fetch('https://moveimperial.herokuapp.com/api/todos/')
.then(res => res.json())
.then((res) => {
  const data = res.data;
  var shareInfoLen = Object.keys(res).length;
  console.log(shareInfoLen);
  var count = 0;
  for (let i = shareInfoLen-1; i >= 0, count < 4; i--){
    if (res[i].completed) {continue;}
    count++;
    if (count == 1) {console.log(res[i]); getElement('l1').innerHTML =  res[i].title;}
    if (count == 2) {getElement('l2').innerHTML =  res[i].title;}
    if (count == 3) {getElement('l3').innerHTML =  res[i].title;}
    if (count == 4) {getElement('l4').innerHTML =  res[i].title;}


  }
});
  
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
  // document.getElementById('social-btn').addEventListener('click', openSocial);
  // document.getElementById('more-btn').addEventListener('click', openMore);
}

function displayWorkingHomePage() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("home-page-when-working").style.display = "grid";

  // if paused, then I want to show the paused duration left:
  chrome.storage.local.get(["paused", "durationLeft"], function (result) {
    if (result.paused) {
      minutes = parseInt(result.durationLeft / 60, 10);
      seconds = parseInt(result.durationLeft % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      var display = document.querySelector('#countdown');
      display.textContent = minutes + " mins " + seconds + " s to next break";

      // I also want to have the continue button displayed, instead of the pause one.
      document.getElementById('pause').style.display = 'none';
      document.getElementById('continue').style.display = '';
    }
  })
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
iniNav();
document.getElementById('create-solo').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('cancelAlarm2').addEventListener('click', clearAlarm);
document.getElementById('pause').addEventListener('click', pauseAlarm);
document.getElementById('continue').addEventListener('click', continueAlarm);

// if the user is currently in the middle of a work session, then the default page of the popup should be the home-page-when-working one.
chrome.storage.local.get("timer", function (result) {
  if (result.timer) {
    displayWorkingHomePage();
  }
});

// starting the countdown when the user has just started a work session.
chrome.storage.local.get(["timer", "endtime", "paused"], function (result) {
  if (result.timer && !result.paused) {
    var display = document.querySelector('#countdown');
    var end = (result.endtime - Date.now()) / 1000;

    startTimer(end, display);
  }
});

// populate the study-time and break-time parameter boxes with values that were previously inputed.
chrome.storage.local.get(["minutes", "pausetime"], function (result) {
  if (result.minutes && result.pausetime) {
    document.getElementById("study-time").value = result.minutes;
    document.getElementById("break-time").value = result.pausetime;
  }
})

chrome.storage.sync.get(["productivity", "mood"], function (result) {
  document.getElementById("productivity-val").textContent = Math.round(result.productivity) + "%";
  document.getElementById("mood-val").textContent = Math.round(result.mood) + "%";
  document.getElementById("well-val").textContent = Math.round((result.mood + result.productivity) / 2) + "%";
})

function getElement(id) {
  return document.getElementById(id);
}

