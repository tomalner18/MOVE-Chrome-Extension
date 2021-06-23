import break_content from "./break_content";
import instagram_embed from "./instagram_embed";

function newQuote() {
  var rand = break_content.quotes[Math.floor(Math.random() * (break_content.quotes.length))];
  document.getElementById('output-quote').innerHTML = rand;
  document.getElementById('output-quote').style.fontWeight = 'bold';
  document.getElementById('output-quote').style.fontStyle = 'italic';
  document.getElementById('output-quote').style.fontSize = "25px";
  document.getElementById('output-quote').style.textAlign = "center";
  //document.getElementById('home-page').style.backgroundImage = "url('https://i.ytimg.com/vi/ysuUmpovJBE/maxresdefault.jpg')";
}

// for relaxation tips
function newActivity() {
  var rand = break_content.activities[Math.floor(Math.random() * (break_content.activities.length))];
  document.getElementById('output-activity').innerHTML = rand;
  document.getElementById('output-activity').style.fontWeight = 'bold';
  document.getElementById('output-activity').style.fontStyle = 'italic';
  document.getElementById('output-activity').style.textAlign = "center";
  document.getElementById('output-activity').style.fontSize = "25px";
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
  if (x.length != 0) {
    x[0].classList.remove("active");
  }
}

function openLanding() {
  clearNav();
  clearTabs();
  document.getElementById("landing-page").style.display = "grid";
  var y = document.getElementById("home-btn");
  y.classList.add("active");
}

function openExercise() {
  clearNav();
  clearTabs();
  document.getElementById("exercise-page").style.display = "grid";
  var y = document.getElementById("exercise-btn");
  y.classList.add("active")
}

function openMoreExercises() {
  clearNav();
  clearTabs();
  document.getElementById("more-exercise-page").style.display = "grid";
  var y = document.getElementById("exercise-btn");
  y.classList.add("active")
}

function openRelax() {
  clearNav();
  clearTabs();
  document.getElementById("relax-page").style.display = "grid";
  var y = document.getElementById("relax-btn");
  y.classList.add("active");
  newActivity();
}

function openMotivation() {
  clearNav();
  clearTabs();
  document.getElementById("motivation-page").style.display = "grid";
  var y = document.getElementById("motivation-btn");
  y.classList.add("active");
  newQuote();
}

function iniBreakNav() {
  document.getElementById('exercise-btn').addEventListener('click', openExercise);
  document.getElementById('relax-btn').addEventListener('click', openRelax);
  document.getElementById('motivation-btn').addEventListener('click', openMotivation);
  document.getElementById('home-btn').addEventListener('click', openLanding);
}

function iniBacks() {
  document.getElementById("more-exercise-back").addEventListener('click', openExercise);
}

function iniMoreExercise() {
  document.getElementById("more-exercise-videos").addEventListener('click', openMoreExercises);
}

function obtainExerciseVideo() {
  const randomInt = Math.floor(Math.random() * break_content.exercise_videos.length);
  var video = break_content.exercise_videos[randomInt];

  return video;
}

function embedExerciseVideos() {

  var videos = [];
  var i;
  for (i = 0; i < 4; i++) {
    videos.push(obtainExerciseVideo());
  }

  fetch("./single_exercise.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector(".single_exercise_video").innerHTML = data;
    })

  fetch("./more_exercises.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector(".more-exercise-videos").innerHTML = data;

      const blockquote_tags = document.querySelectorAll(".instagram-media");
      const hyperlink_tags = document.querySelectorAll(".instagram-media-2");
      const headers = document.querySelectorAll(".video_title");

      for (i = 0; i < 4; i++) {

        var video = videos[i];

        const url = video.filePath + "?utm_source=ig_embed&amp;utm_campaign=loading";
        blockquote_tags[i].setAttribute("data-instgrm-permalink", url);
        hyperlink_tags[i].href = url;
        headers[i].textContent = video.title;

        instagram_embed.embed();
      }
    })
}

iniBreakNav();
iniBacks();
iniMoreExercise();

embedExerciseVideos();

document.getElementById('quote').addEventListener('click', newQuote);
document.getElementById('activity').addEventListener('click', newActivity);