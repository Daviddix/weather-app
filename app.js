//-------------------POPUP INPUT----------------

const popupInput = document.querySelector('.popup-overlay input')

const overlay = document.querySelector('.popup-overlay')

const getWeatherBtn = document.querySelector('.popup button')

const loadingText = document.querySelector('.loading')

//------------WEATHER STATS---------------------

const weatherSearchBtn = document.querySelector('.search')

const inAppInput = document.querySelector('header input')

const main = document.querySelector('main')

let state = document.querySelector('.state')
let country = document.querySelector('.country')
let date = document.querySelector('.date')
let mainTemperature = document.querySelector('.temperature-main')
let weatherDescription = document.querySelector('.weather-description')
let detailedWeatherDescription = document.querySelector('.detailed-weather-description')
let minTemp = document.querySelector('.min')
let maxTemp = document.querySelector('.max')


let windSpeed = document.querySelector('.wind-speed')
let windGust = document.querySelector('.wind-gust')
let windDegree = document.querySelector('.wind-degree')
let humidity = document.querySelector('.humidity')
let pressure = document.querySelector('.pressure')
let visibility = document.querySelector('.visibility')
let clouds = document.querySelector('.clouds')

//-----------------------------API DETAILS------------------------------
const key = "e55261b50a660c459eccaa5d4ba9e943"


document.body.style.overflowY = 'hidden'


//-----------------FUNCTIONS TO GET WEATHER----------------------
function getWeatherPopup(city){
    let stateInput = city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${stateInput}&units=metric&appid=${key}`
    fetch(url)
    .then(raw=>{
        if (!raw.ok) {
            throw new Error
        }
        return raw.json()
    })
    .then(data =>{
        loadingText.textContent = `getting weather for ${stateInput}`
       state.textContent = data.name + ","
       country.textContent = data.sys.country


//removes comma from the end of the month
       oldDate = new Date(data.dt *1000).toDateString().split(' ').join(', ')
        let a = oldDate
        let arr = a.split(' ')
        let l = arr[1].split('')
        newArr = l.map((letter, inx)=>{
        if(inx == arr.length - 1){
            return letter = ''
        }else{
            return letter
        }
        })
        let newMonth = newArr.join(',').split(',').join('')
        arr.splice(1,1,newMonth)
        let newDate = arr.join(' ')
        date.textContent = newDate


       mainTemperature.textContent = `${Math.round(data.main.temp)}°c`

//checks if it is cold
       if (Math.round(data.main.temp) <= 23) {
        main.style.backgroundImage = `linear-gradient(134deg, var(--blueLight), var(--blueDark))`
        weatherSearchBtn.style.backgroundColor = ` var(--blueMag)`
        }else if(Math.round(data.main.temp) > 23){
        main.style.backgroundImage = `linear-gradient(134deg, var(--orangeLight) 60%, var(--orangeDark))`
        weatherSearchBtn.style.backgroundColor = ` var(--orangeMag)`
        }

 //checks if it is night time
        let t = data.dt
        let TimeNow = new Date(t * 1000)
        let hourOfTheDay = TimeNow.getHours()
        if (hourOfTheDay > 19) {
            main.style.backgroundImage = `linear-gradient(134deg, var(--darkDark) , var(--darkLight))`
            weatherSearchBtn.style.backgroundColor = ` var(--darkMag)`
            document.documentElement.style.setProperty('--textDark', '--textLight')
        }


       weatherDescription.textContent = data.weather[0].main
       detailedWeatherDescription.textContent = data.weather[0].description
       minTemp.textContent = `${Math.round(data.main.temp_min)}°c /`
       maxTemp.textContent =` ${Math.round(data.main.temp_max)}°c`


       windSpeed.textContent = `${data.wind.speed}m/s`
       windGust.textContent = `${data.wind.gust}mph`
       //some countries dont have wind gust so it checks if the wind gust exists in the api and makes it avoid returning undefined
       if (data.wind.gust == undefined) {
        windGust.textContent = `0mph`
       }
       windDegree.textContent = `${data.wind.deg}°`
       humidity.textContent = `${data.main.humidity}%`
       pressure.textContent = `${data.main.pressure}hPa`
       visibility.textContent = `${data.visibility / 1000}km`
       clouds.textContent = `${data.clouds.all}%`
       overlay.classList.add('close')
       document.body.style.overflowY = 'auto'
       localStorage.setItem('location', stateInput)
    })
    .catch(err=>{
        if (localStorage.getItem('i') == null) {
            localStorage.setItem('i', "1")
            alert(`Oops, an error occurred.
        Please check the spelling of your state and try again 😁
        `)
        }
        
        if(localStorage.getItem('i') == "2"){
            alert(`Seems like the error occurred again, it means your state's weather data isn't available on the openweathermap API Or there's a problem with your internet connection
        `)
        }
        localStorage.setItem('i', "2")
        
        
    })
}

function getWeatherNormal(city){
    let stateInput = city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${stateInput}&units=metric&appid=${key}`
    fetch(url)
    .then(raw=>{
        if (!raw.ok) {
            throw new Error
        }
        return raw.json()
    })
    .then(data =>{
       state.textContent = data.name + ","
       country.textContent = data.sys.country

//removes comma from the end of the month
       oldDate = new Date(data.dt *1000).toDateString().split(' ').join(', ')
        let a = oldDate
        let arr = a.split(' ')
        let l = arr[1].split('')
        newArr = l.map((letter, inx)=>{
        if(inx == arr.length - 1){
            return letter = ''
        }else{
            return letter
        }
        })
        let newMonth = newArr.join(',').split(',').join('')
        arr.splice(1,1,newMonth)
        let newDate = arr.join(' ')
        date.textContent = newDate

        

       mainTemperature.textContent = `${Math.round(data.main.temp)}°c`

//checks if it is cold
       if (Math.round(data.main.temp) <= 23) {
           main.style.backgroundImage = `linear-gradient(134deg, var(--blueLight), var(--blueDark))`
           weatherSearchBtn.style.backgroundColor = ` var(--blueMag)`
       }else if(Math.round(data.main.temp) > 23){
        main.style.backgroundImage = `linear-gradient(134deg, var(--orangeLight) 60%, var(--orangeDark))`
        weatherSearchBtn.style.backgroundColor = ` var(--orangeMag)`
       }

       //checks if it is night  time
       let t = data.dt
       let TimeNow = new Date(t * 1000)
       let hourOfTheDay = TimeNow.getHours()
       if (hourOfTheDay > 19) {
           main.style.backgroundImage = `linear-gradient(134deg, var(--darkDark) , var(--darkLight))`
           weatherSearchBtn.style.backgroundColor = ` var(--darkMag)`
           document.documentElement.style.setProperty('--textDark', '--textLight')
       }


       weatherDescription.textContent = data.weather[0].main
       detailedWeatherDescription.textContent = data.weather[0].description
       minTemp.textContent = `${Math.round(data.main.temp_min)}°c /`
       maxTemp.textContent =` ${Math.round(data.main.temp_max)}°c`


       windSpeed.textContent = `${data.wind.speed}m/s`
       windGust.textContent = `${data.wind.gust}mph`
       if (data.wind.gust == undefined) {
        windGust.textContent = `0mph`
       }
       windDegree.textContent = `${data.wind.deg}°`
       humidity.textContent = `${data.main.humidity}%`
       pressure.textContent = `${data.main.pressure}hPa`
       visibility.textContent = `${data.visibility / 1000}km`
       clouds.textContent = `${data.clouds.all}%`
       document.body.style.overflowY = 'auto'
       localStorage.setItem('location', stateInput)
    })
    .catch(err=>{
        if (localStorage.getItem('i') == null) {
            localStorage.setItem('i', "1")
            alert(`Oops, an error occurred.
        Please check the spelling of your state and try again 😁
        `)
        }
        
        if(localStorage.getItem('i') == "2"){
            alert(`Seems like the error occurred again, it means your state's weather data isn't available on the openweathermap API Or there's a problem with your internet connection
        `)
        }
        localStorage.setItem('i', "2")
        
    })
    
}

//-------------------------CHECKS IF THE USER HAS INPUT A A CITY/USED THE APP BEFORE

if (localStorage.getItem('location') == null) {
    //---------------------------------------------
//get weather from popup input
    getWeatherBtn.addEventListener('click', ()=>{
        let inputVal = popupInput.value.toLowerCase().trimEnd().trimStart()
    
        if (inputVal == '') {
            alert(`C'mon man, Empty values are not allowed ಠ_ಠ`)
        }else if(inputVal != ''){
           getWeatherPopup(inputVal) 
        }
    })
    
    popupInput.addEventListener('keyup', (e)=>{
        if (e.key == 'Enter') {
            let inputVal = popupInput.value.toLowerCase().trimEnd().trimStart()
    
        if (inputVal == '') {
            alert(`C'mon man, Empty values are not allowed ಠ_ಠ`)
        }else if(inputVal != ''){
           getWeatherPopup(inputVal) 
        }
        }
        
        
    })
    
    //get weather for specific cities when app is opened
    weatherSearchBtn.addEventListener('click', ()=>{
        let inputVal = inAppInput.value.toLowerCase().trimEnd().trimStart()
    
        if (inputVal == '') {
            alert(`C'mon man, Empty values are not allowed ಠ_ಠ`)
        }else if(inputVal != ''){
           getWeatherNormal(inputVal) 
        }
        
        inAppInput.value = ''
    })
    
    inAppInput.addEventListener('keyup', (e)=>{
        if (e.key == 'Enter') {
            let inputVal = inAppInput.value.toLowerCase().trimEnd().trimStart()
    
        if (inputVal == '') {
            alert(`C'mon man, Empty values are not allowed ಠ_ಠ`)
        }else if(inputVal != ''){
           getWeatherNormal(inputVal) 
        }
        
        inAppInput.value = ''
        }
        
    })
} else {
    let loc = localStorage.getItem('location')
    overlay.classList.add('close')
    getWeatherNormal(loc) 
   
    document.body.style.overflowY = 'auto'

        //get weather for specific cities when app is opened
        weatherSearchBtn.addEventListener('click', ()=>{
            let inputVal = inAppInput.value.toLowerCase().trimEnd().trimStart()
        
            if (inputVal == '') {
                alert(`C'mon man, Empty values are not allowed ಠ_ಠ`)
            }else if(inputVal != ''){
               getWeatherNormal(inputVal) 
            }
            
            inAppInput.value = ''
        })
        
        inAppInput.addEventListener('keyup', (e)=>{
            if (e.key == 'Enter') {
                let inputVal = inAppInput.value.toLowerCase().trimEnd().trimStart()
        
            if (inputVal == '') {
                alert(`C'mon man, Empty values are not allowed ಠ_ಠ`)
            }else if(inputVal != ''){
               getWeatherNormal(inputVal) 
            }
            
            inAppInput.value = ''
            }
            
        })
}