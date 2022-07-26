let inputField=document.querySelector('input');
let newLocation=document.querySelector('.search-bar i');
let theTempreture=document.querySelector('.tempreture');
let precipitation=document.querySelector('.precip');
let theHumidity=document.querySelector('.humidity');
let windSpeed=document.querySelector('.wind-speed');
let theLocation=document.querySelector('.location');
let time=document.querySelector('.time')
let theConditions=document.querySelector('.conditions');
let currentIcon=document.querySelector('.info i');
let next=document.querySelector('.next-days')

city=window.localStorage.getItem('lastLocation');

function getWeather(){
    let XHR=new XMLHttpRequest();
    
    XHR.onreadystatechange=function(){
        if(this.readyState===4 && this.status===200){
            handleData(JSON.parse(this.responseText));
            nextDays(JSON.parse(this.responseText))
            handleIcon(JSON.parse(this.responseText))
        }
    };

    XHR.open('GET',`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=FDJNMTNHFVPXC47ZXTDFAPM7Y`,true);
    XHR.send();
};

getWeather()

function handleData(data){
    let currentConditions=data.currentConditions;
    
    theTempreture.innerHTML=Math.round (( currentConditions.temp - 32 ) * 5/9 ) +' °C';

    precipitation.innerHTML='Precipitation: '+ currentConditions.precipprob+' %';

    theHumidity.innerHTML='Humidity: '+ currentConditions.humidity+' %';

    windSpeed.innerHTML='Wind Speed: '+ currentConditions.windspeed+' km/h';

    theLocation.innerHTML=data.resolvedAddress;

    time.innerHTML=data.days[0].datetime+'  '+currentConditions.datetime;

    theConditions.innerHTML=currentConditions.conditions;
};

newLocation.onclick=function(){
    if(inputField!=''){
        city=inputField.value;
        window.localStorage.setItem('lastLocation',inputField.value);
        inputField='';
        getWeather();
    }
}

function nextDays(data){

    let days=data.days.slice(1,8)
    next.innerHTML=''

    days.forEach((day,index) => {
        let div=document.createElement('div');
        let dateTxt=document.createTextNode(new Date(day.datetime).toDateString().split(' ')[0]);
        let dateSpan=document.createElement('span');
        let tempTxt=document.createTextNode( Math.round (( day.tempmin - 32 ) * 5/9 ) +'°/'+ Math.round (( day.tempmax - 32 ) * 5/9 )+'°');
        let tempSpan=document.createElement('span');
        let i=document.createElement('i');
        let iSpan=document.createElement('span');
        iSpan.appendChild(i);

        let dayIcon=day.icon
        switch(dayIcon){
            case 'cloudy':
                i.className='fas fa-cloud grey';
                break;
    
            case 'rain':
                i.className='fas fa-cloud-rain grey';
                break;
    
            case 'partly-cloudy-day':
                i.className='fas fa-cloud-sun mix';
                break;
    
            case 'partly-cloudy-night':
                i.className='fas fa-cloud-moon blue';
                break;
    
            case 'clear-day':
                i.className='fas fa-sun yellow';
                break;
    
            case 'clear-night':
                i.className='fas fa-moon blue';
                break;
    
            case 'snow':
                i.className='fas fa-snowflake white';
                break;
    
            case 'fog':
                i.className='fas fa-smog grey';
                break;
        }

        dateSpan.appendChild(dateTxt);
        tempSpan.appendChild(tempTxt);
        div.appendChild(dateSpan);
        div.appendChild(iSpan)
        div.appendChild(tempSpan);
        next.appendChild(div)
        
    });
}

function handleIcon(data){
    let icon=data.currentConditions.icon;

    switch(icon){
        case 'cloudy':
            currentIcon.className='fas fa-cloud grey';
            break;

        case 'rain':
            currentIcon.className='fas fa-cloud-rain grey';
            break;

        case 'partly-cloudy-day':
            currentIcon.className='fas fa-cloud-sun mix';
            break;

        case 'partly-cloudy-night':
            currentIcon.className='fas fa-cloud-moon blue';
            break;

        case 'clear-day':
            currentIcon.className='fas fa-sun yellow';
            break;

        case 'clear-night':
            currentIcon.className='fas fa-moon blue';
            break;

        case 'snow':
            currentIcon.className='fas fa-snowflake white';
            break;

        case 'fog':
            currentIcon.className='fas fa-smog';
            break;
    }
}