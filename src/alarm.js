'use strict';

var myNotificationID = null;

var default_config = {
  study_length: 40,
  break_length: 5,
  break_message: "It has come to the end of this study period, please take a break!",
  snooze_length: 5,
  idle_reset_enabled: false,
  idle_reset_minutes: 5,
  skip_break_enabled: true,
  snooze_enabled: true
}

chrome.browserAction.setBadgeText({text: 'OFF'});
chrome.browserAction.setBadgeBackgroundColor({color: 'red'})

// Creates a Chrome Notification
function notifyFinish() {
  chrome.notifications.create(`move-notification-${Date.now()}`, {
    type: "basic",
    iconUrl: "icons/logo48.png",
    requireInteraction: true,
    title:    'Study Break!',
    message:  default_config.break_message,
    buttons: [
      {title: 'Exercises'}
    ],
    priority: 0}, function(id) {
      myNotificationID = id;
    });
    var yourSound = new Audio('./alarm.mp3');
    yourSound.play();
  }

function openBreakWindow() {
  chrome.windows.create({
    url: "break.html",
    type: "popup",
    width: 436,  /*Add 16 to desired size? */
    height: 300
  });
}

chrome.alarms.onAlarm.addListener(function() {
  chrome.extension.getBackgroundPage().console.log("hi");
  chrome.storage.local.get(['pausetime', 'timer', 'break'], function(result) {
    chrome.extension.getBackgroundPage().console.log('Value currently is ' + result.pausetime);
    chrome.extension.getBackgroundPage().console.log('Value currently is ' + result.timer);

    // when the work session has ended and we've just entered a break.
    if (result.timer && !result.break) {
      chrome.notifications.create(`my-notification-${Date.now()}`,{
        type:     'basic',
        iconUrl:  'icons/logo48.png',
        requireInteraction: true,
        title:    'Study Break!',
        message:  'It has come to the end of this study period, please take a break!',
        buttons: [
          {title: 'Take a break'}
        ],
        priority: 0}, function(id) {
          myNotificationID = id;
        });
        playSound();
        chrome.browserAction.setBadgeText({text: 'BRK'});
        chrome.browserAction.setBadgeBackgroundColor({color: 'blue'})

        chrome.storage.local.set({timer: false, break: true} , function (){
          console.log("Storage Succesful");

          // during a break, users should be openning a new break.html window when they click on the chrome extension icon.
          chrome.browserAction.setPopup({popup: ""});
          chrome.browserAction.onClicked.addListener(openBreakWindow);
        });
        let endtime = Date.now() + 1000 * 60 * result.pausetime
        chrome.storage.local.set({timerend: endtime}, function(){
          chrome.alarms.create("break", {when: endtime});
        });
        playSound();         

    } else {
      
      // when we've reached the end of a break. Here timer is false, break doesn't matter.
      if(!result.timer) {
        chrome.storage.local.set({timer: false, break: true} , function () {
          console.log("End of break");
        });
        chrome.browserAction.setBadgeText({text: 'OFF'});
        chrome.browserAction.setBadgeBackgroundColor({color: 'red'})
        chrome.notifications.create(`my-notification-${Date.now()}`,{
          type:     'basic',
          iconUrl:  'icons/logo48.png',
          requireInteraction: true,
          title:    'End of Study Break',
          message:  'It has come to the end of this break period, you are advised to resume working!',
          buttons: [
            {title: 'Okay'}
          ],
          priority: 0}, 
          function(id) {
            myNotificationID = id + 1;
          });
          var sound = new Audio('./mixkit-positive-notification-951.wav')
            sound.play();
      } 
      
      // when timer is true, and break is true
      // don't think this one is hit?
      else {
        chrome.storage.local.set({timer: true, break: false} , function () {
          console.log("End of break");
          chrome.browserAction.setPopup({popup: "./popup.html"});
          chrome.browserAction.onClicked.removeListener(openBreakWindow);
        });
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.browserAction.setBadgeBackgroundColor({color: 'green'})
        chrome.notifications.create(`my-notification-${Date.now()}`,{
          type:     'basic',
          iconUrl:  'icons/logo48.png',
          requireInteraction: true,
          title:    'End of Study Break',
          message:  'Resume working!',
          buttons: [
            {title: 'Okay'}
          ],
          priority: 0}, function(id) {
            myNotificationID = id + 1;
          });
          var sound = new Audio('./mixkit-positive-notification-951.wav')
            sound.play();

      }

      
    }
  });
  
 
});

function playSound() {
  var yourSound = new Audio('./alarm.mp3');
  yourSound.play();
}


chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === myNotificationID) {
      if (btnIdx === 0) {
        chrome.windows.create({
          url: "break.html",
          type: "popup",
          width: 436,  /*Add 16 to desired size? */
          height: 300
        })
      } 
    }
});
