//holds celcius and ferenheight temp values
let cTemp;
let fTemp;
let cityName;
let weather;
//counter for cel to fer button
let cToFCount = 0;
async function getWeather() {
    
    //variables for api key and url
    const apiKey = "58a91b9f699bd51278d31b2198acb10d";
    const city = document.getElementById('city').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`

    //fethcing api data
    const response = await fetch(weatherUrl);
    // Check if the city was found
    if (response.status === 404) {
        alert("City not found. Please enter a valid city.");
        return;
    }
    let data = await response.json();
    

    //udates temp and weather and city variables
    cTemp = Math.round(data.main.temp);
    fTemp = Math.round(((9/5) * cTemp) + 32);
    cityName = data.name;
    weather = data.weather[0].main;
    console.log(weather);
    //output function
    weatherOutput();
    console.log(data);
    console.log(data.wind_speed);
}

//outputs weather data
function weatherOutput(){
    //if city was not found
    if(cTemp == undefined || fTemp == undefined){
        alert("Location could not be found, enter valid location");
        return;
    }
    document.getElementById('cityOut').innerHTML = cityName;
    document.getElementById('tempOut').innerHTML = fTemp + '°F';
    //updates weather icon based on weather
    document.getElementById("weatherImg").src = "images/" + weather + ".png";
}

//function that is called when metric unit is changed
function fToC(){
    //if no city has been entered, break
    let cityInput = document.getElementById('city').value;
    console.log(cityInput);
    if(cTemp == undefined || fTemp == undefined){
        alert("City temperature could not be found, please enter a valid city");
    }
    if (cToFCount%2 == 0){
        document.getElementById('tempOut').innerHTML = cTemp + '°C';
        document.getElementById("celToFerImg").src="images/fahrenheit.png"
    }
    else{
        document.getElementById('tempOut').innerHTML = fTemp + '°F';
        document.getElementById("celToFerImg").src="images/celsius (1).png"
    }
    ++cToFCount;
}


