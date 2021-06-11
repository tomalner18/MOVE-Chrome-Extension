function renderBadge(remaining_seconds, phase) {
    chrome.browserAction.setBadgeText({
        text: getClockRemaining(remaining_seconds)
    })
}
function clearBadge() {
    chrome.browserAction.setBadgeText({text: ''});
}

function getClockRemaining(remaining_seconds) {
    remaining_seconds = Math.abs.parseInt(remaining_seconds, 10);
    let mins = (remaining_seconds / 60).toString();
    let secs = (remaining_seconds - (mins * 60)).toString();
    
    if(mins < 10) {
        mins = "0" + mins;
    }
    if(secs < 10) {
        secs = "0" + secs;
    }

    return (mins + ":" + secs)
}
