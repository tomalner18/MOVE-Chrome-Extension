function setPro() {
  chrome.storage.sync.get(["productivity_count", "productivity"], function (result) {
    var count = 0;
    var pro_count;
    var avg;

    if (result.pro_count == undefined) {
      pro_count = 0;
    }
    else {
      pro_count = result.productivity_count;
    }
    if (result.productivity == undefined) {
      avg = 0;
    }
    else {
      avg = result.productivity;
    }

    // Find the rating
    for (i = 0; i < 5; i++) {
      var star = document.getElementById("p-rate-" + (i + 1));
      if (star.checked) {
        count = i + 1;
      }
    }

    count = count * 20;
    avg = ((avg * pro_count) + count) / (pro_count + 1);
    pro_count = pro_count + 1;
  
    chrome.storage.sync.set({ 'productivity': avg, "productivity_count": pro_count }, function () {
      console.log("Productivity is set to " + avg);
      console.log("Productivity sample size is " + pro_count)
    });
  })
}

function setMood() {
  chrome.storage.sync.get(["mood_count", "mood"], function (result) {
    var count = 0;
    var mood_count;
    var avg;

    if (result.mood_count == undefined) {
      mood_count = 0;
    }
    else {
      mood_count = result.mood_count;
    }
    if (result.mood == undefined) {
      avg = 0;
    }
    else {
      avg = result.mood;
    }

    // Find the rating
    for (i = 0; i < 5; i++) {
      var star = document.getElementById("m-rate-" + (i + 1));
      if (star.checked) {
        count = i + 1;
      }
    }

    count = count * 20;
    avg = ((avg * mood_count) + count) / (mood_count + 1);
    mood_count = mood_count + 1;
  
    chrome.storage.sync.set({ 'mood': avg, "mood_count": mood_count }, function () {
      console.log("Mood is set to " + avg);
      console.log("Mood sample size is " + mood_count)
    });
  })
}

const pro_btn = document.getElementById("pro-btn");
const pro_post = document.getElementById("pro-post");
const pro_widget = document.getElementById("pro-star-widget");
const pro_edit_btn = document.getElementById("pro-edit");
pro_btn.onclick = () => {
  pro_widget.style.display = "none";
  pro_post.style.display = "block";
  setPro();
  pro_edit_btn.onclick = () => {
    pro_widget.style.display = "block";
    pro_post.style.display = "none";
  }
  return false;
}

const mood_btn = document.getElementById("mood-btn");
const mood_post = document.getElementById("mood-post");
const mood_widget = document.getElementById("mood-star-widget");
const mood_edit_btn = document.getElementById("mood-edit");
mood_btn.onclick = () => {
  mood_widget.style.display = "none";
  mood_post.style.display = "block";
  setMood();
  mood_edit_btn.onclick = () => {
    mood_widget.style.display = "block";
    mood_post.style.display = "none";
  }
  return false;
}
