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
    title:    'Work Break!',
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
    state: "maximized"
  });

  // we've decided to trigger the break timer only when the break window is open, NOT when the study timer ends.
  // the is_first_open_of_break_window field records if this openBreakWindow() call is the first one after the work session ends.
  chrome.storage.local.get(['pausetime', 'is_first_open_of_break_window'], function(result) {
    if (result.is_first_open_of_break_window) {
      let endtime = Date.now() + 1000 * 60 * result.pausetime
      chrome.storage.local.set({timerend: endtime}, function(){
        chrome.alarms.create("break", {when: endtime});
      });
      chrome.storage.local.set({is_first_open_of_break_window: false}, function() {
        console.log("Storage Succesful");
      });
    } 
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
        title:    'Work Break!',
        message:  'It has come to the end of this work period, please take a break!',
        buttons: [
          {title: 'Take a break'}
        ],
        priority: 0}, function(id) {
          myNotificationID = id;
        });
        playSound();
        chrome.browserAction.setBadgeText({text: 'BRK'});
        chrome.browserAction.setBadgeBackgroundColor({color: 'blue'})

        chrome.storage.local.set({timer: false, break: true, is_first_open_of_break_window: true} , function (){
          console.log("Storage Succesful");

          // during a break, users should be openning a new break.html window when they click on the chrome extension icon.
          chrome.browserAction.setPopup({popup: ""});
          chrome.browserAction.onClicked.addListener(openBreakWindow);
        });
  
        playSound();         

    } else {
      
      // when we've reached the end of a break. Here timer is false, break doesn't matter.
      if(!result.timer) {
        chrome.storage.local.set({timer: false, break: true} , function () {
          console.log("End of break");
        });

        // calculating the total work stats.
        var work_minutes = 0;
        chrome.storage.local.get("minutes", function(result) {
          work_minutes = result.minutes;
        })

        // add the minutes worked in the work session into the today_work_minutes_total
        chrome.storage.sync.get(["today_work_minutes_total"], function(result) {
          if (result.today_work_minutes_total == undefined) {
            result.today_work_minutes_total = work_minutes;
          }
          else {
            result.today_work_minutes_total += work_minutes;
          }
        })

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
          var sound = new Audio('./mixkit-positive-notification-951.wav');
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
        openBreakWindow();
      } 
    }
});
