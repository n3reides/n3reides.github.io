import { RequestSMHI } from "./fetchData.js";
import { getTimeInfoArray } from "./timeinfo.js";
import { getWeatherInfoArray } from "./weatherinfo.js";
import { buildStructure } from "./buildHTML.js";

function buildModule() {
  let request = RequestSMHI(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json"
  ).then(function (data) {
    let lang = "en";
    let timeInfo = getTimeInfoArray(data.timeSeries);
    let weatherInfo = getWeatherInfoArray(data.timeSeries, lang);
    buildStructure(timeInfo, weatherInfo, lang);
  });
}
window.whichDate = new Date().getDate();
let getWeather = buildModule();
