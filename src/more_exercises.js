import axios from "axios";
import instagram_embed from "./instagram_embed";

const blockquote_tags = document.querySelectorAll(".instagram-media");
const hyperlink_tags = document.querySelectorAll(".instagram-media-2");
const headers = document.querySelectorAll(".video_title");

let promises = [];
let video_data = [];

// first loop: collect all API responses asynchronously.
var i;
for (i = 0; i < 3; i++) {

    // generate random integer from 1 to 31, as there are 31 videos stored in the database right now.
    const randomInt = Math.floor(Math.random() * 31) + 1
    const api_query = "https://moveimperial.herokuapp.com/api/videos/" + randomInt;

    promises.push(axios.get(api_query)
                    .then(function (response) {
                        video_data.push(response);
                        }
                    )
    );
}

// second loop: when all API responses have been collected, we proceed to populate the more_exercises.html page with the data we've gathered.
Promise.all(promises).then(() => {

        console.log(video_data.length);

        for (i = 0; i < 3; i++) {

            var response = video_data[i];

            const url = response.data.filePath + "?utm_source=ig_embed&amp;utm_campaign=loading";
            blockquote_tags[i].setAttribute("data-instgrm-permalink", url);
            hyperlink_tags[i].href = url;
            headers[i].textContent = response.data.title;
            
            instagram_embed.embed();

        }
    }
);


