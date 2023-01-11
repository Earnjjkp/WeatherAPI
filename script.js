const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-text"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

const Icon = document.querySelector(".icon");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value !=""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, OnError)
    }else{
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position){
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a7f50863edad6da328135487ac8df933`
    fetchData();
}

function OnError(error){
    infoText.innerHTML = error.message;
    infoText.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a7f50863edad6da328135487ac8df933`;
    fetchData();
}

function fetchData(){
    infoText.innerHTML = "Getting weather details...";
    infoText.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoText.classList.replace("pending","error");
    if(info.cod == "404"){
        infoText.innerHTML = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description ,id} = info.weather[0];
        const {feels_like ,humidity ,temp} = info.main;

        if(id == 800){
            Icon.href = "Weather Icons/clear.svg"
            wIcon.src = "Weather Icons/clear.svg"
        }else if(id >= 200 && id <=232){
            Icon.href = "Weather Icons/strom.svg"
            wIcon.src = "Weather Icons/strom.svg"
        }else if(id >= 600 && id <=622){
            Icon.href = "Weather Icons/snow.svg"
            wIcon.src = "Weather Icons/snow.svg"
        }else if(id >= 701 && id <=781){
            Icon.href = "Weather Icons/haze.svg"
            wIcon.src = "Weather Icons/haze.svg"
        }else if(id >= 801 && id <=804){
            Icon.href = "Weather Icons/cloud.svg"
            wIcon.src = "Weather Icons/cloud.svg"
        }else if((id >= 300 && id <=321) || (id >= 500 && id <= 531)){
            Icon.href = "Weather Icons/rain.svg"
            wIcon.src = "Weather Icons/rain.svg"
        }

        wrapper.querySelector(".temp .number").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".temp .number-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;

        infoText.classList.remove("pending","error");
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", () =>{
    window.location.reload();
});