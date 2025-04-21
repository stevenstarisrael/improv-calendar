

{/* <script> */ }
const defaultView = "https://airtable.com/embed/appW0McLlByaH5C0D/shrVpIkFPbgpH4IrA";
let cityUrls = {};
const dropdownContainer = document.getElementById("dropdown");

async function fetchIframesList() {
    const response = await fetch('https://opensheet.vercel.app/1CC7IeHDrI4dgV1Qnx0sdHdCWo4YVZCkx1VvBva3r8GE/CityLinks');
    const data = await response.json();

    const citySelect = document.getElementById("citySelect");

    data.forEach(row => {
        if (row.City && row.View) {
            const cityName = row.City.toLowerCase();
            cityUrls[cityName] = row.View;

            const option = document.createElement("option");
            option.value = cityName;
            option.textContent = row.City;
            citySelect.appendChild(option);
        }
    });

    // Load default calendar
    document.getElementById("calendarFrame").src = cityUrls["all shows"] || defaultView;
    dropdownContainer.style.display = "block";
}

function updateCalendar() {
    const city = document.getElementById('citySelect').value;
    const frame = document.getElementById('calendarFrame');

    frame.style.opacity = '0'; // fade out
    setTimeout(() => {
        frame.src = cityUrls[city] || defaultView;
        frame.style.opacity = '1'; // fade in after switching
    }, 300);
}

function togglePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
    event.stopPropagation();
}

let wordList = [];
let wordDataLoaded = false;

async function fetchWordList() {
    const button = document.getElementById("randomWordButton");
    button.innerText = "Please wait...";
    button.disabled = true;
    button.style.opacity = 0.6;
    button.style.cursor = "not-allowed";

    const response = await fetch('https://opensheet.vercel.app/1CC7IeHDrI4dgV1Qnx0sdHdCWo4YVZCkx1VvBva3r8GE/ImprovWords');
    const data = await response.json();

    wordList = data.map(item => ({
        word: item.Word,
        desc: item.Description && item.Description.trim() !== '' ? item.Description : ''
    }));
    wordDataLoaded = true;
    showRandomWord();

    // Enable the button after loading
    button.innerText = "Show Me A Random Word";
    button.disabled = false;
    button.style.opacity = 1;
    button.style.cursor = "pointer";

    randomWordContainer.style.display = "block";
}

function showRandomWord() {
    if (!wordDataLoaded) {
        fetchWordList();
        return;
    }

    generateWord();
    document.getElementById("wordPopup").style.display = "flex";
}

function generateWord() {
    const random = wordList[Math.floor(Math.random() * wordList.length)];
    document.getElementById("randomWord").innerText = random.word;
    document.getElementById("wordDesc").innerText = random.desc;
}

function closeWordPopup() {
    document.getElementById("wordPopup").style.display = "none";
}

// ✅ Load both datasets when page loads
window.onload = async () => {
    await fetchIframesList();
};
{/* </script> */ }