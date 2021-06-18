import break_content from "./break_content";
import instagram_embed from "./instagram_embed";

function newQuote(){
  var rand = break_content.quotes[Math.floor(Math.random() * (break_content.quotes.length))];
  document.getElementById('output-quote').innerHTML = rand;
  document.getElementById('output-quote').style.fontWeight = 'bold';
  document.getElementById('output-quote').style.fontStyle = 'italic';
  document.getElementById('output-quote').style.fontSize= "25px";
  document.getElementById('output-quote').style.textAlign = "center";
  //document.getElementById('home-page').style.backgroundImage = "url('https://i.ytimg.com/vi/ysuUmpovJBE/maxresdefault.jpg')";
}

function newActivity(){
  var rand = break_content.activities[Math.floor(Math.random() * (break_content.activities.length))];
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

function openLanding() {
  clearNav();
  clearTabs();
  document.getElementById("landing-page").style.display = "grid"
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

function iniBacks() {
  document.getElementById("exercise-back").addEventListener('click', openLanding);
  document.getElementById("relax-back").addEventListener('click', openLanding);
  document.getElementById("motivation-back").addEventListener('click', openLanding);
}

function obtainExerciseVideo() {
  const randomInt = Math.floor(Math.random() * break_content.exercise_videos.length) + 1;
  var video = break_content.exercise_videos[randomInt];

  return video;
}

function injectSingleExerciseHTML() {

  console.log("inside break.js right now");
  var video = obtainExerciseVideo();

  fetch("./single_exercise.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector(".single_exercise_video").innerHTML = data;

      const blockquote_tag = document.querySelector(".instagram-media");
      const hyperlink_tag = document.querySelector(".instagram-media-2");
      const header = document.querySelector(".video_title");

      const url = video.filePath + "?utm_source=ig_embed&amp;utm_campaign=loading";
      blockquote_tag.setAttribute("data-instgrm-permalink", url);
      hyperlink_tag.href = url;
      header.textContent = video.title;

      instagram_embed.embed();
    })
}

  iniBreakNav();
  iniBacks();
  injectSingleExerciseHTML();
  document.getElementById('quote').addEventListener('click', newQuote);
  document.getElementById('activity').addEventListener('click', newActivity);
