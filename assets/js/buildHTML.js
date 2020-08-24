export function buildStructure(timeArray, weatherArray, lang) {
  let div = document.getElementsByClassName("weather-module")[0];
  let module = document.createElement("section");
  let moduleHeader = document.createElement("h2");
  moduleHeader.innerText =
    lang === "en" ? "Weather in Djupvik" : "Vädret i Djupvik";
  module.appendChild(moduleHeader);
  let todaysDate = document.createElement("h3");
  todaysDate.id = "date-wrapper";
  let date = new Date();
  todaysDate.innerText = `${getWeekdayString(
    date.getDay()
  )} - ${date.getDate()} ${getMonthString(date.getMonth())}`;
  module.appendChild(todaysDate);
  let table = document.createElement("table");
  table.id = "weather-table";
  module.appendChild(table);
  div.appendChild(module);
  table.appendChild(buildTableHeader(lang));
  buildTableData(timeArray, weatherArray, lang);
  let pickerHeader = document.createElement("h3");
  pickerHeader.innerText =
    lang === "en"
      ? "Pick a date in the scroller"
      : "Scrolla i menyn för att välja datum";
  module.appendChild(pickerHeader);
  module.appendChild(buildDatePicker(timeArray, weatherArray, lang));
}

function getWantedWeather(weatherArray, timeArray) {
  const wantedTimes = ["5", "8", "11", "15", "18", "20"];
  let selectedDate = window.whichDate;
  let wantedWeatherArray = [];
  for (let i = 0; i < timeArray.length; i++) {
    if (timeArray[i].date.split("-")[2] === String(selectedDate)) {
      if (wantedTimes.includes(String(timeArray[i].time.split(":")[0]))) {
        wantedWeatherArray.push({
          time: timeArray[i].time.split(":")[0],
          weather: weatherArray[i],
        });
      }
    }
  }
  if (wantedWeatherArray.length < 2) {
    wantedWeatherArray = [];
    for (let i = 0; i < timeArray.length; i++) {
      if (timeArray[i].date.split("-")[2] === String(selectedDate)) {
        wantedWeatherArray.push({
          time: timeArray[i].time.split(":")[0],
          weather: weatherArray[i],
        });
      }
    }
  }
  return wantedWeatherArray;
}
function buildTableHeader(lang) {
  let headerRow = document.createElement("tr");
  headerRow.appendChild(createTimeHeader(lang));
  headerRow.appendChild(createTempHeader(lang));
  headerRow.appendChild(createWindHeader(lang));
  headerRow.appendChild(createSkyHeader(lang));
  return headerRow;
}

function buildTableData(timeArray, weatherArray, lang) {
  let table = document.getElementById("weather-table");
  let wantedWeatherArray = getWantedWeather(weatherArray, timeArray);
  for (let i = 0; i < wantedWeatherArray.length; i++) {
    let dataRow = buildTableDataRow(wantedWeatherArray[i]);
    dataRow.id = `${i}-th-data-row`;
    table.appendChild(dataRow);
  }
}
function removeTableData() {
  let table = document.getElementById("weather-table");
  while (table.childNodes.length > 1) {
    table.removeChild(table.lastElementChild);
  }
}
function buildTableDataRow(weather) {
  let dataRow = document.createElement("tr");
  let firstChild = document.createElement("td");
  firstChild.appendChild(document.createTextNode(`${weather.time}.00`));
  let secondChild = document.createElement("td");
  secondChild.appendChild(
    document.createTextNode(`${weather.weather.temperature}°C`)
  );
  let thirdChild = document.createElement("td");
  thirdChild.appendChild(
    createWindInfo(weather.weather.windDirection, weather.weather.windStrength)
  );
  let fourthChild = document.createElement("td");
  fourthChild.append(document.createTextNode(weather.weather.cloudinfo));
  dataRow.append(firstChild, secondChild, thirdChild, fourthChild);
  return dataRow;
}
function createWindInfo(windDir, windStr) {
  let element = document.createElement("span");
  element.className = "wind-info";
  element.appendChild(document.createTextNode(`${windStr} `));
  let arrow = document.createElement("img");
  arrow.src = "assets/arrow-icon.png";
  arrow.className = "wind-dir-arrow";
  arrow.style.transform = `rotate(${-90 + windDir}deg)`;
  element.appendChild(arrow);

  return element;
}

function createSkyHeader(lang) {
  let element = document.createElement("th");
  element.appendChild(
    lang === "en"
      ? document.createTextNode("Weather")
      : document.createTextNode("Himmel")
  );
  return element;
}

function createTempHeader(lang) {
  let element = document.createElement("th");
  element.appendChild(
    lang === "en"
      ? document.createTextNode("Temperature")
      : document.createTextNode("Temperatur")
  );
  return element;
}

function createTimeHeader(lang) {
  let element = document.createElement("th");
  element.appendChild(
    lang === "en"
      ? document.createTextNode("Time")
      : document.createTextNode("Tidpunkt")
  );
  return element;
}
function createWindHeader(lang) {
  let element = document.createElement("th");
  element.appendChild(
    lang === "en"
      ? document.createTextNode("Wind")
      : document.createTextNode("Vind")
  );
  return element;
}

function buildDatePicker(timeArray, weatherArray, lang) {
  let list_of_dates = document.createElement("ul");
  let saved_dates = [];
  timeArray.forEach(function (time) {
    let date = new Date(time.date);
    let date_in_month = date.getDate();
    if (!saved_dates.includes(date_in_month)) {
      saved_dates.push(date_in_month);
      let weekday = getWeekdayString(date.getDay());
      let month = getMonthString(date.getMonth());
      let list_element = document.createElement("li");
      let button = document.createElement("button");
      if (saved_dates.length < 2) {
        button.selected = true;
      }
      button.appendChild(document.createTextNode(weekday));
      button.appendChild(document.createElement("br"));
      button.appendChild(
        document.createTextNode(String(date_in_month + " " + month))
      );
      button.onclick = function () {
        window.whichDate = button.textContent.match(/(\d+)/)[0];
        button.selected = true;
        removeTableData();
        let todaysDate = document.getElementById("date-wrapper");
        todaysDate.innerText = `${getWeekdayString(
          date.getDay()
        )} - ${date.getDate()} ${getMonthString(date.getMonth())}`;
        buildTableData(timeArray, weatherArray, lang);
      };
      list_element.appendChild(button);
      list_of_dates.appendChild(list_element);
    }
  });
  return list_of_dates;
}

function getMonthString(month) {
  let string_month = "";
  switch (month) {
    case 0:
      string_month = "jan";
      break;
    case 1:
      string_month = "feb";
      break;
    case 2:
      string_month = "mar";
      break;
    case 3:
      string_month = "apr";
      break;
    case 4:
      string_month = "maj";
      break;
    case 5:
      string_month = "jun";
      break;
    case 6:
      string_month = "jul";
      break;
    case 7:
      string_month = "aug";
      break;
    case 8:
      string_month = "sep";
      break;
    case 9:
      string_month = "okt";
      break;
    case 10:
      string_month = "nov";
      break;
    case 11:
      string_month = "dec";
      break;
    default:
      break;
  }
  return string_month;
}

function getWeekdayString(weekday) {
  let string_weekday = "";
  switch (weekday) {
    case 1:
      string_weekday = "Måndag";
      break;
    case 2:
      string_weekday = "Tisdag";
      break;
    case 3:
      string_weekday = "Onsdag";
      break;
    case 4:
      string_weekday = "Torsdag";
      break;
    case 5:
      string_weekday = "Fredag";
      break;
    case 6:
      string_weekday = "Lördag";
      break;
    case 0:
      string_weekday = "Söndag";
      break;
    default:
      break;
  }
  return string_weekday;
}
