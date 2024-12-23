const daily = document.querySelector('.board__tab-daily');
const weekly = document.querySelector('.board__tab-weekly');
const monthly = document.querySelector('.board__tab-monthly');
let json;

daily.addEventListener('click', () => {
    fetch('/data.json').then((response) => {
        if(!response.ok) {
            return console.log('JSON EXTRACT ERRROR');
        }
        return response.json();
    }).then((data) => {
        json = data;
        updateCards('daily');
    });
});

weekly.addEventListener('click', () => {
    updateCards('weekly');
});

monthly.addEventListener('click', () => {
    updateCards('monthly');
});


function updateCards(timeframe) {
    json.forEach((item) => {
        const title = item.title.toLowerCase().replace(' ', '-');
        const currentTime = document.querySelector(`.board__${title}-current-time`);
        const previousTime = document.querySelector(`.board__${title}-previous-time`);

        if (currentTime && previousTime) {
            currentTime.textContent = `${item.timeframes[timeframe].current}hrs`;
            previousTime.textContent = `Last Week - ${item.timeframes[timeframe].previous}hrs`;
        }
    });
}