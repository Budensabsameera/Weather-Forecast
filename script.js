const API_key = "6abb2c583e1d4b37fd5a64f3ea6cc221";

let search_icon = document.getElementById("search_btn");

search_icon.addEventListener("click", (event) => {
  event.preventDefault();
  UpdateWeather();
});

let UpdateWeather = async () => {
  let city_name = document.getElementById("cityName").value;

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_key}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
console.log(data);

    if (data.cod === 200) {
      document.getElementById(
        "cityName_description"
      ).textContent = `${data.name}`;
      document.getElementById(
        "temp_descrpition"
      ).textContent = `${data.main.temp} °C`;
      document.getElementById(
        "weather_description"
      ).textContent = `${data.weather[0].description}`;

      const iconCode = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.querySelector("#description-container img").src = iconURL;
      document.querySelector("#description-container img").alt =
        data.weather[0].description;
    } else {
      document.getElementById("cityName_description").textContent =
        "City not found!";
      document.getElementById("temp_descrpition").textContent = "";
      document.getElementById("weather_description").textContent = "";
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("cityName_description").textContent = "Error!";
    document.getElementById("temp_descrpition").textContent = "";
    document.getElementById("weather_description").textContent = "";
  }
};
window.addEventListener("load", () => {
  document.getElementById("cityName").value = "Mumbai";

  UpdateWeather();
});
