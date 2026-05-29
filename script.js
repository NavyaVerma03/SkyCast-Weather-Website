const apiKey =
"820df179b90a47a098181513262405";

let localTimeInterval;

// ================= MAIN WEATHER FUNCTION =================

async function getWeather(cityName){

  let city =
  cityName ||
  document.getElementById("city").value;

  if(city === ""){

    alert("Please enter city");

    return;
  }

  let apiUrl =
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes`;

  try{

    let response =
    await fetch(apiUrl);

    let data =
    await response.json();

    if(data.error){

      alert("City not found");

      return;
    }

    // ================= LOCATION =================

    document.getElementById("cityName")
    .innerHTML =
    `${data.location.name}, ${data.location.region}, ${data.location.country}`;

    // ================= LOCAL TIME =================

    updateLocalTime(data.location.localtime);

    // ================= WEATHER DATA =================

    document.getElementById("temp")
    .innerHTML =
    Math.round(data.current.temp_c) + "°C";

    document.getElementById("condition")
    .innerHTML =
    data.current.condition.text;

    document.getElementById("humidity")
    .innerHTML =
    data.current.humidity + "%";

    document.getElementById("wind")
    .innerHTML =
    data.current.wind_kph + " km/h";

    document.getElementById("feelsLike")
    .innerHTML =
    Math.round(data.current.feelslike_c) + "°C";

    document.getElementById("visibility")
    .innerHTML =
    data.current.vis_km + " km";

    // ================= TEMPERATURE COLOR =================

    let temp =
    data.current.temp_c;

    if(temp >= 35){

      document.getElementById("temp")
      .style.color = "#ffb347";
    }

    else if(temp <= 15){

      document.getElementById("temp")
      .style.color = "#00c6ff";
    }

    else{

      document.getElementById("temp")
      .style.color = "#ffffff";
    }

    // ================= WEATHER LOGIC =================

    let condition =
    data.current.condition.text.toLowerCase();

    let isDay =
    data.current.is_day;

    let icon =
    document.getElementById("weatherIcon");

    

    /* ================= NIGHT ================= */

    if(isDay === 0){

      icon.src =
      "https://cdn-icons-png.flaticon.com/512/581/581601.png";

      document.body.style.setProperty(
        "--weather-bg",
        "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')"
      );
    }

    /* ================= RAIN ================= */

    

    /* ================= CLOUD ================= */

    else if(
      condition.includes("cloud") ||
      condition.includes("overcast")
    ){

      icon.src =
      "https://cdn-icons-png.flaticon.com/512/414/414927.png";

      document.body.style.setProperty(
        "--weather-bg",
        "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2070&auto=format&fit=crop')"
      );
    }

    /* ================= SUNNY ================= */

    else if(
      condition.includes("sunny") ||
      condition.includes("clear")
    ){

      icon.src =
      "https://cdn-icons-png.flaticon.com/512/869/869869.png";

      document.body.style.setProperty(
        "--weather-bg",
        "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2070&auto=format&fit=crop')"
      );
    }

    /* ================= SNOW ================= */

    else if(condition.includes("snow")){

      icon.src =
      "https://cdn-icons-png.flaticon.com/512/642/642102.png";

      document.body.style.setProperty(
        "--weather-bg",
        "url('https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=2070&auto=format&fit=crop')"
      );
    }

    /* ================= THUNDER ================= */

    else if(condition.includes("thunder")){

      icon.src =
      "https://cdn-icons-png.flaticon.com/512/1146/1146860.png";

      document.body.style.setProperty(
        "--weather-bg",
        "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2070&auto=format&fit=crop')"
      );
    }

    /* ================= DEFAULT ================= */

    else{

      icon.src =
      "https://cdn-icons-png.flaticon.com/512/1779/1779940.png";

      document.body.style.setProperty(
        "--weather-bg",
        "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop')"
      );
    }

  }

  catch(error){

    console.log(error);

    alert("Something went wrong");
  }
}

// ================= LIVE LOCAL TIME =================

function updateLocalTime(localtime){

  clearInterval(localTimeInterval);

  function updateClock(){

    const now = new Date();

    document.getElementById("dateTime").innerHTML =
      "🕒 " + now.toLocaleString();
  }

  updateClock();

  localTimeInterval = setInterval(updateClock, 1000);
}
// ================= ENTER KEY =================

document.getElementById("city")
.addEventListener("keypress",
function(event){

  if(event.key === "Enter"){

    getWeather();
  }
});

// ================= LOCATION WEATHER =================

function getLocationWeather(){

  navigator.geolocation.getCurrentPosition(

    async(position)=>{

      let lat =
      position.coords.latitude;

      let lon =
      position.coords.longitude;

      let apiUrl =
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=yes`;

      let response =
      await fetch(apiUrl);

      let data =
      await response.json();

      getWeather(`${lat},${lon}`);
    },

    ()=>{

      alert("Location access denied");
    }

  );
}

