
var cityfound
var citylat
var citylon
var icon
var citieslistarr = []
var hoydetails = document.querySelector('#hoyforecastdetails');
// var liEl = document.createElement('li');
var forecastcards = document.querySelector('.forecastcards')
var citieslist = document.querySelector('#citieslist')
var clickcity;



// #citieslist event listener
$('.cities').on('click', function(event) {
    // console.log(event.target)
    if (event.target.innerHTML) {
        // console.log(event.target.textContent)
        clickcity = event.target.textContent;
        console.log(clickcity);
        fetch('https://api.openweathermap.org/geo/1.0/direct?q=${' + clickcity + '}&limit=5&appid=2c0f5ad633be35265ae6dda779dbd872')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                cityfound = data[0].name;
                // console.log(cityfound)
                citylat = (data[0].lat);
                citylon = (data[0].lon);
                $('#hoyforecastcity').append(cityfound + ' ' + currentTime.date)

                // console.log(cityfound + citylat + citylon)
                // Fetch that pulls up weather information
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + citylat + '&lon=' + citylon + '&units=imperial&exclude=hourly&appid=2c0f5ad633be35265ae6dda779dbd872')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        var info = [
                            (data.daily[0].temp.day),
                            (data.daily[0].wind_speed),
                            (data.daily[0].humidity),
                            (data.daily[0].weather[0].icon),
                            (data.daily[0].uvi),
                        ]
                        console.log(`temp: ${info[0]} \n wind: ${info[1]} \n humidity: ${info[2]} \n icon: ${info[3]} \n uvi: ${info[4]}`);
                        var liEl = document.createElement('li');
                        hoydetails.innerHTML = `<li> Temp: ${info[0]} &#8457 </li> <li> Wind: ${info[1]} MPH </li> <li> Humidity: ${info[2]} %</li> <li> UV Index: <span id="uvi"> ${info[4]} </span></li>`;
                        // data.daily[i].
                        if (info[4] <=2) {
                            document.getElementById('uvi').style.backgroundColor = '#23b123';
                            document.getElementById('uvi').style.color = 'white';
                        } else if (info[4]>2 && info[4] <=5) {
                            document.getElementById('uvi').style.backgroundColor = '#fff204';
                            document.getElementById('uvi').style.color = 'white';
                        } else if (info[4]>5 && info[4] <=7) {
                            document.getElementById('uvi').style.backgroundColor = '#ff8c00';
                            document.getElementById('uvi').style.color = 'white';
                        } else {
                            document.getElementById('uvi').style.backgroundColor = '#d01111';
                            document.getElementById('uvi').style.Color = 'white';
                        }
                       


                        
                        for (var i = 1; i < data.daily.length - 2; i++) {
                            var dailyinfo = [
                                (data.daily[i].temp.day),
                                (data.daily[i].wind_speed),
                                (data.daily[i].humidity),
                                (data.daily[i].weather[0].icon),
                                (data.daily[i].uvi),
                            ]
                            var dates = [
                                day1,
                                day2,
                                day3,
                                day4,
                                day5,
                            ]
                            console.log(dailyinfo)
                            var forecastdiv = document.querySelector('#fivedayforecastdiv')
                            var forecastcard = document.createElement('div');
                            forecastcard.setAttribute('class','forecastcards')

                            forecastcard.innerHTML = `
                        <h4> ${dates[i-1]} </h4>
                        <!-- <ul id="hoy+1"> -->
                        <li><img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" height="80px" width="80px"></img></li>                            
                            <li>Temp: ${data.daily[i].temp.day} &#8457 </li>
                            <li>Wind: ${data.daily[i].wind_speed} MPH </li>
                            <li>Humidity: ${data.daily[i].humidity} % </li>
                        <!-- </ul> -->
                    `
                            forecastdiv.appendChild(forecastcard)
                            //     forecastdiv.innerHTML = `<div class="forecastcards">
                            //     <h4>Date</h4>
                            //     <!-- <ul id="hoy+1"> -->
                            //         <li><img src="${data.daily[i].weather[0].icon}"></img></li>
                            //         <li>Temp: ${data.daily[i].temp.day} </li>
                            //         <li>Wind: ${data.daily[i].wind_speed} </li>
                            //         <li>Humidity: ${data.daily[i].humidity} </li>
                            //     <!-- </ul> -->
                            // </div>`
                        }
                    })


            })

        // $('#hoyforecastcity').append(citysearched + ' ' + currentTime.date)

    }
   

})


// Search Button Event Listener
$('#searchbutton').on('click', function () {
    // alert('hello world!')
    if ($('#searchbar').val() !== '') {
        localStorage.setItem('citysearched', $.trim($('#searchbar').val()));
        var citysearched = localStorage.getItem('citysearched');
        console.log(citysearched)
        fetch('https://api.openweathermap.org/geo/1.0/direct?q=${' + citysearched + '}&limit=5&appid=2c0f5ad633be35265ae6dda779dbd872')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                cityfound = data[0].name;
                // console.log(cityfound)
                citylat = (data[0].lat);
                citylon = (data[0].lon);
                $('#hoyforecastcity').append(cityfound + ' ' + currentTime.date)

                // console.log(cityfound + citylat + citylon)
                // Fetch that pulls up weather information
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + citylat + '&lon=' + citylon + '&units=imperial&exclude=hourly&appid=2c0f5ad633be35265ae6dda779dbd872')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        var info = [
                            (data.daily[0].temp.day),
                            (data.daily[0].wind_speed),
                            (data.daily[0].humidity),
                            (data.daily[0].weather[0].icon),
                            (data.daily[0].uvi),
                        ]
                        console.log(`temp: ${info[0]} \n wind: ${info[1]} \n humidity: ${info[2]} \n icon: ${info[3]} \n uvi: ${info[4]}`);
                        var liEl = document.createElement('li');
                        hoydetails.innerHTML = `<li> Temp: ${info[0]} &#8457 </li> <li> Wind: ${info[1]} MPH </li> <li> Humidity: ${info[2]} % </li> <li> UV Index: <span id="uvi"> ${info[4]} </span></li>`;
                        // data.daily[i].
                        if (info[4] <=2) {
                            document.getElementById('uvi').style.backgroundColor = '#23b123';
                            document.getElementById('uvi').style.color = 'white';
                        } else if (info[4]>2 && info[4] <=5) {
                            document.getElementById('uvi').style.backgroundColor = '#fff204';
                            document.getElementById('uvi').style.color = 'white';
                        } else if (info[4]>5 && info[4] <=7) {
                            document.getElementById('uvi').style.backgroundColor = '#ff8c00';
                            document.getElementById('uvi').style.color = 'white';
                        } else {
                            document.getElementById('uvi').style.backgroundColor = '#d01111';
                            document.getElementById('uvi').style.Color = 'white';
                        }

                        
                        for (var i = 1; i < data.daily.length - 2; i++) {
                            var dailyinfo = [
                                (data.daily[i].temp.day),
                                (data.daily[i].wind_speed),
                                (data.daily[i].humidity),
                                (data.daily[i].weather[0].icon),
                                (data.daily[i].uvi),
                            ]
                            var dates = [
                                day1,
                                day2,
                                day3,
                                day4,
                                day5,
                            ]
                            console.log(dailyinfo)
                            var forecastdiv = document.querySelector('#fivedayforecastdiv')
                            var forecastcard = document.createElement('div');
                            forecastcard.setAttribute('class','forecastcards')

                            forecastcard.innerHTML = `
                        <h4> ${dates[i-1]} </h4>
                        <!-- <ul id="hoy+1"> -->
                            <li><img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" height="80px" width="80px"></img></li>
                            <li>Temp: ${data.daily[i].temp.day} &#8457</li>
                            <li>Wind: ${data.daily[i].wind_speed} MPH</li>
                            <li>Humidity: ${data.daily[i].humidity} %</li>
                        <!-- </ul> -->
                    `
                            forecastdiv.appendChild(forecastcard)
                            //     forecastdiv.innerHTML = `<div class="forecastcards">
                            //     <h4>Date</h4>
                            //     <!-- <ul id="hoy+1"> -->
                            //         <li><img src="${data.daily[i].weather[0].icon}"></img></li>
                            //         <li>Temp: ${data.daily[i].temp.day} </li>
                            //         <li>Wind: ${data.daily[i].wind_speed} </li>
                            //         <li>Humidity: ${data.daily[i].humidity} </li>
                            //     <!-- </ul> -->
                            // </div>`
                        }
                    })


            })

        // $('#hoyforecastcity').append(citysearched + ' ' + currentTime.date)

    }
}
)









// Moment.js Functionality 
console.log(moment())
var currentTime = { text: moment().format("h:mm A"), date: moment().format('(M/DD/YYYY)') };
console.log(currentTime)
var day1 = moment().add(1, 'days').format("M-DD-YYYY");
var day2 = moment().add(2, 'days').format("M-DD-YYYY");
var day3 = moment().add(3, 'days').format("M-DD-YYYY");
var day4 = moment().add(4, 'days').format("M-DD-YYYY");
var day5 = moment().add(5, 'days').format("M-DD-YYYY");