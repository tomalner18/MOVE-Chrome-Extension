import axios from "axios";

console.log("testing 123");

const api_query = "http://127.0.0.1:8000/api/videos/19";

const instagam_hyperlink = document.querySelector(".instagram");
const button = instagam_hyperlink.getElementsByTagName("input")[0];

axios.get(api_query)
.then(function (response) {
    console.log(response);
    console.log(response.data.filePath);

    instagam_hyperlink.href = "https://" + response.data.filePath;
    button.value = response.data.title;

    console.log("testing 456");
});



