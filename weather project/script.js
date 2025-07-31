async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();

  if (location === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "d6bb236d95d14e039db183611253007";
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();

    const resultBox = document.getElementById("weatherResult");
    resultBox.innerHTML = `
      <h3>${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
      <p><strong>Local Time:</strong> ${data.location.localtime}</p>
      <p><strong>Temperature:</strong> ${data.current.temp_c} °C / ${data.current.temp_f} °F</p>
      <p><strong>Feels Like:</strong> ${data.current.feelslike_c} °C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text} 
         <img src="${data.current.condition.icon}" alt="weather icon">
      </p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Cloud Cover:</strong> ${data.current.cloud}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} kph (${data.current.wind_dir})</p>
      <p><strong>Air Quality (PM2.5):</strong> ${data.current.air_quality.pm2_5.toFixed(2)}</p>
      <p><strong>Last Updated:</strong> ${data.current.last_updated}</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
