// Defining weather with functions needed to search to be more easily called
let weather = {
    "apiKey": "d026f6b7ed319e6e983cee098fde4b8d",
    fetchWeather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&cnt=5&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayForecast(data));
    },
    displayWeather: function(data) {

        // Defining constants to be called for displaying the searched data
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // Displaying data in console
        console.log(name, icon, description, temp, humidity, speed)

        // Changing DOM classes with the searched Data
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = + temp +"°C";
        document.querySelector(".icon").src = "http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed +"km/h";
        
        // Saving the data to local storage
        localStorage.setItem(name, JSON.stringify(data));
    },

    displayForecast: function(data) {
        // Get the forecast container element
        let forecast = document.getElementById("forecast");
    
        // Clear the container element to remove any existing forecast data
        forecast.innerHTML = "";
    
        // Loop through the forecast data and extract the relevant information
        for(let i = 0; i < data.list.length; i++) {
            let date = new Date(data.list[i].dt * 1000);
            let formattedDate = date.toLocaleDateString("en-AU", {
                weekday: "short",
                year: "numeric",
                month: "numeric",
                day: "numeric"
            });
            let formattedTime = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
            });
            
            console.log(formattedDate + ", " + formattedTime);
            
            let temperature = data.list[i].main.temp;
            let humidity = data.list[i].main.humidity;
            let description = data.list[i].weather[0].description;
            let icon = data.list[i].weather[0].icon;
    
            // Create a new element to display the forecast information
            let forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = 
                "<div class='day'>" + formattedDate + "<br>" + formattedTime +"</div>" + 
                "<div class='icon'><img src='http://openweathermap.org/img/w/" + icon + ".png' alt='weather icon'></div>" +
                "<div class='temp'>" + temperature + "°C</div>" + 
                "<div class='humidity'>" + humidity + "%</div>" + 
                "<div class='description'>" + description + "</div>";
                
                // Append the forecast item to the forecast container
                forecast.appendChild(forecastItem);
            }
        },
        
        // Function making whats typed in the search bar to pull the city info available from the API
        search: function (){
            this.fetchWeather(document.querySelector(".search-bar").value);
            let city = document.querySelector(".search-bar").value;
            let history = document.getElementById("history");
            history.innerHTML += "<li>" + city + "</li>";
    }
};

const searchHistoryList = document.querySelector('#history');

searchHistoryList.addEventListener('click', function(event) {
    if(event.target.tagName === "LI") {
        let city = event.target.innerText;
        weather.fetchWeather(city);
    }
});

// Making it when the button is clicked, the search funtion fires
document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
});

// Making it when the user presses the Enter key the search function fires
document.querySelector(".search-bar").addEventListener("keyup", function (){
    if (event.key == "Enter") {
        weather.search();
    }
});

// Making the defult search Sydney on page load so something is displayed
weather.fetchWeather("Sydney");