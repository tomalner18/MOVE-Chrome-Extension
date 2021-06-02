'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'icons/logo48.png',
      requireInteraction: true,
      title:    'Study Break!',
      message:  'It has come to the end of this study period, please take a break!',
      buttons: [
        {title: 'exercises'}
      ],
      priority: 0});
      var yourSound = new Audio('./alarm.mp3');
      yourSound.play();
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});