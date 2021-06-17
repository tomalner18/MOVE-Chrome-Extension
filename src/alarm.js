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

// Creates a Chrome Notification
function createNotification() {
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

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create(`my-notification-${Date.now()}`,{
      type:     'basic',
      iconUrl:  'icons/logo48.png',
      requireInteraction: true,
      title:    'Study Break!',
      message:  'It has come to the end of this study period, please take a break!',
      buttons: [
        {title: 'Exercises'},
        {title: 'Other'}
      ],
      priority: 0}, function(id) {
        myNotificationID = id;
      });
      playSound();
});

function playSound() {
  var yourSound = new Audio('./alarm.mp3');
  yourSound.play();
}


chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === myNotificationID) {
        if (btnIdx === 0) {
          window.open("exercise.html");
        } else if (btnIdx === 1) {
          chrome.windows.create({
            url: "break.html",
            type: "popup",
            width: 436,  /*Add 16 to desired size? */
            height: 300
          })
        }
    }
});
