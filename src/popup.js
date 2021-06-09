function setAlarm(event) {
    let minutes = parseFloat(event.target.value);
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: minutes});
    chrome.storage.sync.set({minutes: minutes});
    window.close();
}
  
function clearAlarm() {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.alarms.clearAll();
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
  document.getElementById("homepage").style.display = "inline";
  var y = document.getElementById("home-btn");
  y.classList.add("active")
}

function openStat() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("statpage").style.display = "inline";
  var y = document.getElementById("stat-btn");
  y.classList.add("active")
}

function openCalendar() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("homepage").style.display = "inline";
  var y = document.getElementById("calendar-btn");
  y.classList.add("active")
}

function openSocial() {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
  clearTabs();
  document.getElementById("homepage").style.display = "inline";
  var y = document.getElementById("social-btn");
  y.classList.add("active")
}

function iniNav() {
  document.getElementById('home-btn').addEventListener('click', openHome);
  document.getElementById('stat-btn').addEventListener('click', openStat);
  document.getElementById('calendar-btn').addEventListener('click', openHome);
  document.getElementById('social-btn').addEventListener('click', openHome);
  document.getElementById('more-btn').addEventListener('click', openHome);
}
  
//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
  iniNav();
  document.getElementById('sampleSecond').addEventListener('click', setAlarm);
  document.getElementById('15min').addEventListener('click', setAlarm);
  document.getElementById('30min').addEventListener('click', setAlarm);
  document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
