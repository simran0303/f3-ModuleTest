function contentLoader(){
    getCurrentImageOfTheDay();
};

async function getCurrentImageOfTheDay(){
    let api_key = "dRCUIXCGixdjVvZ71g54dFtjJT1s7JfxlVlmD6Qs"
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);
    let data = await response.json();
    useApiData(data);
};

function useApiData(data){
    document.querySelector("#image").innerHTML += `<img src="${data.url}">`;
    document.querySelector("#title").innerHTML += data.title;
    document.querySelector("#content").innerHTML += data.explanation;
}

//save a date to local storage
function saveSearch(event) {
    const button = document.getElementById("view_button");
    button.addEventListener("submit", function(event){
        event.preventDefault();
    });
    const inputDate = document.getElementById("search-input").value;

    let searches = JSON.parse(localStorage.getItem("searches")) || [];

    searches.push(inputDate);

    localStorage.setItem("searches", JSON.stringify(searches));

    document.getElementById("search-input").value = "";

    getImageOfTheDay(inputDate);
    addSearchToHistory();
}

// Function to display search history in an unordered list
function addSearchToHistory() {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    const ul = document.getElementById("search-history");

    ul.innerHTML = "";

    searches.forEach(date => {
        const li = document.createElement("li");
        li.textContent = date;
        ul.appendChild(li);
    });
}
addSearchToHistory();

//Function to get data for selected date
async function getImageOfTheDay(inputDate){
    let api_key = "dRCUIXCGixdjVvZ71g54dFtjJT1s7JfxlVlmD6Qs"
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${inputDate}`);
    let data = await response.json();
    showdata(data);
};

function showdata(data){
    document.querySelector("#heading").innerHTML = `Picture on ${data.date}`;
    document.querySelector("#image").innerHTML = `<img src="${data.url}">`;
    document.querySelector("#title").innerHTML = data.title;
    document.querySelector("#content").innerHTML = data.explanation;
}




