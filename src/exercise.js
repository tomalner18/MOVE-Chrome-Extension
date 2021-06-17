import axios from "axios";
import instagram_embed from "./instagram_embed";

console.log("the beginning of exercise.js");

// generate random integer from 1 to 31, as there are 31 videos stored in the database right now.
const randomInt = Math.floor(Math.random() * 31) + 1
const api_query = "https://moveimperial.herokuapp.com/api/videos/" + randomInt;

const blockquote_tag = document.querySelector(".instagram-media");
const hyperlink_tag = document.querySelector(".instagram-media-2");
const header = document.querySelector(".video_title");

axios.get(api_query)
.then(function (response) {
    console.log(response);
    console.log(response.data.filePath);

    const url = response.data.filePath + "?utm_source=ig_embed&amp;utm_campaign=loading";
    blockquote_tag.setAttribute("data-instgrm-permalink", url);
    console.log(blockquote_tag);
    hyperlink_tag.href = url;

    header.textContent = response.data.title;

    console.log("the end of exercise.js");

    instagram_embed.embed();
});


