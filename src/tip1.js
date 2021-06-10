var myNotificationID = null;


chrome.alarms.onAlarm.addListener(function() {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.notifications.create("", {
        type:     'basic',
        iconUrl:  'icons/logo48.png',
        requireInteraction: true,
        title:    'Our Tip!',
        message:  'You should drink some water!',
        buttons: [
          {title: 'Done'}
        ],
        priority: 0}, function(id) {
          myNotificationID = id;
        });
        var yourSound = new Audio('./alarm.mp3');
        yourSound.play();
});

 chrome.notifications.onButtonClicked.addListener(function() {
    chrome.storage.sync.get(['minutes'], function() {
      chrome.browserAction.setBadgeText({text: 'ON'});
      chrome.alarms.create({delayInMinutes: 1});
    });
  }
});
