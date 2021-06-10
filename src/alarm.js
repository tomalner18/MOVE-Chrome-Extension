'use strict';

var myNotificationID = null;

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create("", {
      type:     'basic',
      iconUrl:  'icons/logo48.png',
      requireInteraction: true,
      title:    'Study Break!',
      message:  'It has come to the end of this study period, please take a break!',
      buttons: [
        {title: 'Exercises'}
      ],
      priority: 0}, function(id) {
        myNotificationID = id;
      });
      var yourSound = new Audio('./alarm.mp3');
      yourSound.play();
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });

  /* FIRST VERSION - ONLY ONE VIDEO ON LINK
   * window.open("https://www.youtube.com/watch?v=t6LY_7O5J2w&list=PL6vDoQZlo-jvgiws4kutVTUtgNuTygkvU");
   * window.focus();
   */

   /* SECOND VERSION - MORE VIDEOS ALREADY DOWNLOADED
    * window.open("exercises.html");
    */

   /* THIRD VERSION - COMBINED;
    */
    window.open("exercise.html");




});
