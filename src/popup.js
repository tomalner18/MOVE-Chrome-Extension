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
    chrome.storage.local.set({minutes: minutes});
    window.close();
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
  document.getElementById('home-btn').addEventListener('click', openHome);
  document.getElementById('stat-btn').addEventListener('click', openStat);
  document.getElementById('calendar-btn').addEventListener('click', openCalendar);
  document.getElementById('social-btn').addEventListener('click', openSocial);
  document.getElementById('more-btn').addEventListener('click', openMore);
}
  
//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
  iniNav();
  document.getElementById('create-solo').addEventListener('click', setAlarm);
  document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
