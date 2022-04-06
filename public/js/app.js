console.log("Hi this is console!");
// try {
//   fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//       console.log(data);
//       return data;
//     });
//   });
// } catch (err) {
//   console.log(err.message);
// }

const theForm = document.querySelector("form");
const theInput = document.querySelector("input");
const display = document.getElementById("weatherDisplay");
console.log(theForm);

theForm.addEventListener("submit", (e) => {
  e.preventDefault();
  display.innerHTML = "Loading...";
  let location = theInput.value;
  console.log(location);
  fetch(`/weather?address=${location}`).then((response) => {
    console.log(response);
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        display.innerHTML = data.error;
      } else {
        console.log(data);
        const {
          weatherDescription,
          temperature,
          location,
          feelslike,
          windSpeed,
        } = data;
        display.innerHTML = `Today, the temperature at ${location} is ${temperature} degree farenheit and it feels like ${feelslike} degree farenheit and it is ${weatherDescription} today. Also the wind speed is blowing around at ${windSpeed} km/h`;
      }
    });
  });
  //   console.log("Testing the output");
});
