const api_url = "http://localhost/backend";

let holidays;
let history;
let names = ["Peter", "Janez", "Grega", "Nejc"];

// start at this year if no history
const FIRST_YEAR = 2023;

function main()  {
    displayNames();
    displayTable();
    getHolidays();
    getHistory();
}

function generateNextRow() {
    let year = getLatestYear();
    const formerYear = history[year];
    year++;


    const numOfHolidays = getNumOfHolidays();
    let schedule = [];
    for (let i = 0 ; i < numOfHolidays ; i++) {
        if (formerYear) {
            schedule.push(getRandomElt(removeElt(names, formerYear[i])));
        } else {
            schedule.push(getRandomElt(names));
        }
    }
    history[year] = schedule;
    displayTable();
}

function removeElt(original, toRemove) {
    const copy = [];
    for (const elt of original) {
        if (elt != toRemove) {
            copy.push(elt);
        }
    }
    return copy;
}

function getRandomElt(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function getNumOfHolidays() {
    if (!holidays) {
        return 0;
    }
    return holidays.length;
}

function getLatestYear() {
    if (!history) {
        return FIRST_YEAR;
    }
    let maxYear = 0;
    for (const year in history) {
        if (+year > maxYear) {
            maxYear = +year;
        }
    }
    return maxYear;
}

function displayTable() {
    const container = document.getElementById("tableContainer");
    container.innerHTML = "";
    if (!holidays) {
        container.innerHTML = "<div class='level'><h1 class='level-item title is-3'>No holidays</h1></div>";
        return;
    }
    let content = "";
    content += "<table class='table is-fullwidth is-striped'><tbody><tr><th>Leto</th>";
    for (const holiday of holidays) {
        content += `<th>${holiday}</th>`;
    }    
    content += "</tr>";

    if (history) {
        for (const year in history) {
            content += "<tr>";
            content += `<th>${year}</th>`;
            for (const name of history[year]) {
                content += `<td>${name}</td>`;
            }
            content += "</tr>";
        }
    }

    content += "</tbody></table>";
    container.innerHTML = content;
}

function addPerson() {
    const input = document.getElementById("nameInput");
    console.log(input);
    if (input.value != "") {
        names.push(input.value);
    }
    displayNames();
}

function displayNames() {
    const list = document.getElementById("nameList");
    list.innerHTML = "";
    for (const name of names) {
        list.innerHTML += `<li>${name}</li>`;
    }
}

function getHolidays() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${api_url}/holidays.php`);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        holidays = JSON.parse(xhr.responseText);
        displayTable();
    }
    };
    xhr.send();
}

function getHistory() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${api_url}/get_history.php`);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        history = JSON.parse(xhr.responseText);
        displayTable();
    }
    };
    xhr.send();
}