let headerWatch = document.getElementById("watch");
let watch = new Date();

function convertTime(date_str) {
    let temp_time = date_str.split(" ");
    let temp_time1 = temp_time[4].split(":");
    return temp_time1[0] + ":" + temp_time1[1] + ":" + temp_time1[2];
}

// headerWatch.innerHTML = convertTime(String(watch));

export { headerWatch, watch, convertTime }