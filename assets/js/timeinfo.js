class TimeInfo {
  constructor(times) {
    this.date = times[0];
    this.time = times[1].substr(0, times[1].length - 1);
  }
}
export function getTimeInfoArray(data) {
  let finalArray = [];
  data.forEach(function (series) {
    let newTime = new TimeInfo(series.validTime.split("T"));
    finalArray.push(newTime);
  });
  return finalArray;
}
