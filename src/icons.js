var quotes = ["Education is the passport to the future, for tomorrow belongs to those who prepare for it today. — Malcolm X",
  "Teachers can open the door, but you must enter it yourself. — Chinese proverb",
  "The beautiful thing about learning is that no one can take it away from you. —B.B. King",
  "Don’t let what you cannot do interfere with what you can do. — John Wooden",
  "A person who never made a mistake never tried anything new. — Albert Einstein",
  "Learning is never done without errors and defeat. – Vladimir Lenin",
  "Never let the fear of striking out stop you from playing the game. — Babe Ruth",
  "Procrastination makes easy things hard and hard things harder. — Mason Cooley",
  "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
  "I find that the harder I work, the more luck I seem to have. – Thomas Jefferson",
  "Genius is 10% inspiration, 90% perspiration. — Thomas Edison",
  "Success is the sum of small efforts, repeated. — R Collier",
  "Ambition is the path to success. Persistence is the vehicle you arrive in. —Bill Bradley",
  "A man’s worth is no greater than his ambitions. —Marcus Aurelius",
  "Believe it can be done. When you believe something can be done, really believe, your mind will find the ways to do it. Believing a solution paves the way to solution. —David Joseph Schwartz"];

var activities = ["Drink some water", "Grab a snack", "Go for a walk", "Go for a run",
  "Try to scribble/draw/paint something", "Take a few deep breaths", "Meditate", "Relax to music",
  "Close your eyes and think about your favourite place", "Bond with your pet", "Cook something",
  "Read two pages from your favourite novel", "Take a power nap", "Play your favourite instrument"];

function newQuote(){
  var rand = quotes[Math.floor(Math.random() * (quotes.length))];
  document.getElementById('output-quote').innerHTML = rand;
  document.getElementById('output-quote').style.fontWeight = 'bold';
  document.getElementById('output-quote').style.fontStyle = 'italic';
  document.getElementById('output-quote').style.fontSize= "25px";
  document.getElementById('output-quote').style.textAlign = "center";
  //document.getElementById('home-page').style.backgroundImage = "url('https://i.ytimg.com/vi/ysuUmpovJBE/maxresdefault.jpg')";
}

function newActivity(){
  var rand = activities[Math.floor(Math.random() * (activities.length))];
  document.getElementById('output-activity').innerHTML = rand;
  document.getElementById('output-activity').style.fontWeight = 'bold';
  document.getElementById('output-activity').style.fontStyle = 'italic';
  document.getElementById('output-activity').style.textAlign = "center";
  document.getElementById('output-activity').style.fontSize="25px";
}

function clearTabs() {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
}

function clearNav() {
  var x = document.getElementsByClassName("active");
  if(x.length != 0) {
    x[0].classList.remove("active");
  }
}

function openExercise() {
  clearNav();
  clearTabs();
  document.getElementById("exercise-page").style.display = "grid";
  var y = document.getElementById("exercise-btn");
  y.classList.add("active")
}

function openRelax() {
  clearNav();
  clearTabs();
  document.getElementById("relax-page").style.display = "grid";
  var y = document.getElementById("relax-btn");
  y.classList.add("active")
}

function openMotivation() {
  clearNav();
  clearTabs();
  document.getElementById("motivation-page").style.display = "grid";
  var y = document.getElementById("motivation-btn");
  y.classList.add("active");
}

function iniBreakNav() {
  document.getElementById('exercise-btn').addEventListener('click', openExercise);
  document.getElementById('relax-btn').addEventListener('click', openRelax);
  document.getElementById('motivation-btn').addEventListener('click', openMotivation);
}

  iniBreakNav();
  document.getElementById('quote').addEventListener('click', newQuote);
  document.getElementById('activity').addEventListener('click', newActivity);
