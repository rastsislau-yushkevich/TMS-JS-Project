import { showCardsFromLocalStorage } from "./workWithLocalStorage.js";
import { convertTime, headerWatch, watch } from "./time.js";

showCardsFromLocalStorage();
setInterval(() => {
  let watch = new Date();
  headerWatch.innerHTML = convertTime(String(watch));
}, 1000);
