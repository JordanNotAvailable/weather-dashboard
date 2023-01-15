// Defining weather with functions needed to search to be more easily called
let weather = {
    "apiKey": "d026f6b7ed319e6e983cee098fde4b8d",
    fetchWeather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
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
    },

    // Function making whats typed in the search bar to pull the city info available from the API
    search: function (){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

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