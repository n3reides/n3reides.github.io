class WeatherInfo {
  constructor(params, cloudinfo) {
    this.temperature = params.find((obj) => obj.name === "t").values[0];
    this.windDirection = params.find((obj) => obj.name === "wd").values[0];
    this.windStrength = params.find((obj) => obj.name === "ws").values[0];
    this.cloudinfo = cloudinfo;
  }
}
export function getWeatherInfoArray(data, lang) {
  console.log(lang);
  let finalArray = [];
  data.forEach(function (series) {
    let params = series.parameters;
    let cloudiness = cloudCalculator(
      params.find((obj) => obj.name === "Wsymb2").values[0],
      lang,
      ""
    );
    let newTime = new WeatherInfo(params, cloudiness);
    finalArray.push(newTime);
  });
  return finalArray;
}

// Switch for the Wsymb2 explanation parameters (translation done by hand)
function cloudCalculator(wsymb2, lang, cloud) {
  switch (wsymb2) {
    case 1:
      lang === "en" ? (cloud = "Clear sky") : (cloud = "Klar himmel");
      return cloud;
      break;
    case 2:
      lang === "en"
        ? (cloud = "Nearly clear sky")
        : (cloud = "Nästan klar himmel");
      return cloud;
      break;
    case 3:
      lang === "en"
        ? (cloud = "Variable cloudiness")
        : (cloud = "Mild molnighet");
      return cloud;
      break;
    case 4:
      lang === "en" ? (cloud = "Halfclear sky") : (cloud = "Halvklar himmel");
      return cloud;
      break;
    case 5:
      lang === "en" ? (cloud = "Cloudy sky") : (cloud = "Molnig himmel");
      return cloud;
      break;
    case 6:
      lang === "en" ? (cloud = "Overcast") : (cloud = "Mulet");
      return cloud;
      break;
    case 7:
      lang === "en" ? (cloud = "Fog") : (cloud = "Dimma");
      return cloud;
      break;
    case 8:
      lang === "en"
        ? (cloud = "Light rain showers")
        : (cloud = "Lätta regnskurar");
      return cloud;
      break;
    case 9:
      lang === "en"
        ? (cloud = "Moderate rain showers")
        : (cloud = "Måttliga regnskurar");
      return cloud;
      break;
    case 10:
      lang === "en"
        ? (cloud = "Heavy rain showers")
        : (cloud = "Kraftiga regnskurar");
      return cloud;
      break;
    case 11:
      lang === "en" ? (cloud = "Thunderstorm") : (cloud = "Åskoväder");
      return cloud;
      break;
    case 12:
      lang === "en"
        ? (cloud = "Light sleet showers")
        : (cloud = "Lätta snöblandade regnskurar");
      return cloud;
      break;
    case 13:
      lang === "en"
        ? (cloud = "Moderate sleet showers")
        : (cloud = "Måttliga snöblandade regnskurar");
      return cloud;
      break;
    case 14:
      lang === "en"
        ? (cloud = "Heavy sleet showers")
        : (cloud = "Kraftiga snöblandade regnskurar");
      return cloud;
      break;
    case 15:
      lang === "en"
        ? (cloud = "Light snow showers")
        : (cloud = "Lätta snöskurar");
      return cloud;
      break;
    case 16:
      lang === "en"
        ? (cloud = "Moderate snow showers")
        : (cloud = "Måttlgia snöskurar");
      return cloud;
      break;
    case 17:
      lang === "en"
        ? (cloud = "Heavy snow showers")
        : (cloud = "Kraftiga snöskurar");
      return cloud;
      break;
    case 18:
      lang === "en" ? (cloud = "Light rain") : (cloud = "Duggregn");
      return cloud;
      break;
    case 19:
      lang === "en" ? (cloud = "Moderate rain") : (cloud = "Måttligt regn");
      return cloud;
      break;
    case 20:
      lang === "en" ? (cloud = "Heavy rain") : (cloud = "Spöregn");
      return cloud;
      break;
    case 21:
      lang === "en" ? (cloud = "Thunder") : (cloud = "Åska");
      return cloud;
      break;
    case 22:
      lang === "en" ? (cloud = "Light sleet") : (cloud = "Snöblandat duggregn");
      return cloud;
      break;
    case 23:
      lang === "en"
        ? (cloud = "Moderate sleet")
        : (cloud = "Måttligt snöblandat regn");
      return cloud;
      break;
    case 24:
      lang === "en" ? (cloud = "Heavy sleet") : (cloud = "Snöblandat spöregn");
      return cloud;
      break;
    case 25:
      lang === "en" ? (cloud = "Light snowfall") : (cloud = "Milt snöfall");
      return cloud;
      break;
    case 26:
      lang === "en"
        ? (cloud = "Moderate snowfall")
        : (cloud = "Måttligt snöfall");
      return cloud;
      break;
    case 27:
      lang === "en" ? (cloud = "Heavy snowfall") : (cloud = "Kraftigt snöfall");
      return cloud;
      break;
    default:
      lang === "en"
        ? (cloud = "Unidentifiable weather")
        : (cloud = "Okänt väder");
      return cloud;
      break;
  }
}
