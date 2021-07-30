let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = '';
})

const getWeather = async (city) => {

  try {
    const URI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7caae7c3155a808f24192919842275a0`
    console.log(URI)
    const response = await fetch(URI);
    const weatherData = await response.json();
    console.log(weatherData);

    const { feels_like } = weatherData.main;
    const { name } = weatherData;
    const { id, main } = weatherData.weather[0];
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273)


    if (id < 300 && id > 200) {
      tempicon.src = "./icon/thunderstorm.svg"

    }
    else if (id < 400 && id > 300) {
      tempicon.src = "./icon/cloud.svg"

    }
    else if (id < 600 && id > 500) {
      tempicon.src = "./icon/rain.svg"

    }
    else if (id < 700 && id > 600) {
      tempicon.src = "./icon/snow.svg"

    }
    else if (id < 800 && id > 700) {
      tempicon.src = "./icon/sun.svg"

    }
    else if (id == 800) {
      tempicon.src = "./icon/sun_rain.svg"
    }

  }

  catch (error) {
    alert("city not found");
  }



};




window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/"

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7caae7c3155a808f24192919842275a0`


      fetch(api).then((response) => {
        return response.json();
      })

        .then((data) => {

          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);


          if (id < 300 && id > 200) {
            tempicon.src = "./icon/thunderstorm.svg"

          }
          else if (id < 400 && id > 300) {
            tempicon.src = "./icon/cloud.svg"

          }
          else if (id < 600 && id > 500) {
            tempicon.src = "./icon/rain.svg"

          }
          else if (id < 700 && id > 600) {
            tempicon.src = "./icon/snow.svg"

          }
          else if (id < 800 && id > 700) {
            tempicon.src = "./icon/sun.svg"

          }
          else if (id == 800) {
            tempicon.src = "./icon/sun_rain.svg"

          }

        })
    })
  }


})