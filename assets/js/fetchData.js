export function RequestSMHI(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      alert(
        "The weather plugin cannot be loaded. Please alert the webmaster about this issue!"
      );
    })
    .then(function (data) {
      return data;
    });
}
