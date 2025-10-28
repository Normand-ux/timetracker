const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('start-stop-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const projectNameInput = document.getElementById('project-name');
const logList = document.getElementById('log-list');
const calculateBtn = document.getElementById('calculate-btn');
const summaryContent = document.getElementById('summary-content');
const copySummaryBtn = document.getElementById('copy-summary-btn');

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let lap = 0;
let projectLog = JSON.parse(localStorage.getItem('projectLog')) || [];

const HOURLY_RATE = 15000; // Ft/óra

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1000);
        startStopBtn.innerHTML = 'Stop';
        startStopBtn.style.backgroundColor = '#ffc107';
        pauseBtn.disabled = false;
        pauseBtn.innerHTML = 'Pause';
        pauseBtn.style.backgroundColor = '#17a2b8';
        running = true;
        paused = false;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        startStopBtn.style.backgroundColor = '#007bff';
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = 'Pause';
        pauseBtn.style.backgroundColor = '#6c757d';
        running = false;
        paused = false;
        logTime();
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0;
    startStopBtn.innerHTML = 'Start';
    startStopBtn.style.backgroundColor = '#007bff';
    pauseBtn.disabled = true;
    pauseBtn.innerHTML = 'Pause';
    pauseBtn.style.backgroundColor = '#6c757d';
    timerDisplay.innerHTML = '00:00:00';
    projectNameInput.value = '';
}

function pauseTimer() {
    if (running && !paused) {
        clearInterval(tInterval);
        pauseBtn.innerHTML = 'Resume';
        pauseBtn.style.backgroundColor = '#28a745';
        paused = true;
    } else if (running && paused) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1000);
        pauseBtn.innerHTML = 'Pause';
        pauseBtn.style.backgroundColor = '#17a2b8';
        paused = false;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function logTime() {
    const projectName = projectNameInput.value.trim();
    if (difference > 0 && projectName !== '') {
        const durationInSeconds = Math.floor(difference / 1000);
        const logEntry = {
            id: Date.now(),
            projectName: projectName,
            duration: durationInSeconds,
            date: new Date().toLocaleString()
        };
        projectLog.push(logEntry);
        localStorage.setItem('projectLog', JSON.stringify(projectLog));
        renderLog();
        resetTimer();
    } else if (projectName === '') {
        alert('Kérlek add meg a projekt nevét!');
    }
}

function renderLog() {
    logList.innerHTML = '';
    projectLog.forEach(entry => {
        const li = document.createElement('li');
        const hours = Math.floor(entry.duration / 3600);
        const minutes = Math.floor((entry.duration % 3600) / 60);
        const seconds = entry.duration % 60;
        li.innerHTML = `<strong>${entry.projectName}</strong>: ${hours} óra ${minutes} perc ${seconds} másodperc (${entry.date}) <button class="delete-btn" data-id="${entry.id}">Törlés</button> <button class="edit-btn" data-id="${entry.id}">Szerkesztés</button>`;
        logList.appendChild(li);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const idToDelete = parseInt(e.target.dataset.id);
            projectLog = projectLog.filter(entry => entry.id !== idToDelete);
            localStorage.setItem('projectLog', JSON.stringify(projectLog));
            renderLog();
            calculateSummary(); // Recalculate summary after deletion
        });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const idToEdit = parseInt(e.target.dataset.id);
            editLogEntry(idToEdit);
        });
    });
}

function clearAllLogs() {
    if (confirm('Biztosan törölni szeretnéd az összes naplóbejegyzést?')) {
        projectLog = [];
        localStorage.removeItem('projectLog');
        renderLog();
        calculateSummary();
    }
}

function editLogEntry(id) {
    const entryIndex = projectLog.findIndex(entry => entry.id === id);
    if (entryIndex === -1) return;

    const entry = projectLog[entryIndex];
    const li = logList.querySelector(`li .edit-btn[data-id="${id}"]`).parentNode;

    li.innerHTML = `
        <input type="text" id="edit-project-name-${id}" value="${entry.projectName}">
        <input type="number" id="edit-duration-hours-${id}" value="${Math.floor(entry.duration / 3600)}" min="0">
        óra
        <input type="number" id="edit-duration-minutes-${id}" value="${Math.floor((entry.duration % 3600) / 60)}" min="0" max="59">
        perc
        <input type="number" id="edit-duration-seconds-${id}" value="${entry.duration % 60}" min="0" max="59">
        másodperc
        <button class="save-edit-btn" data-id="${id}">Mentés</button>
        <button class="cancel-edit-btn" data-id="${id}">Mégse</button>
    `;

    li.querySelector('.save-edit-btn').addEventListener('click', () => {
        const newProjectName = document.getElementById(`edit-project-name-${id}`).value.trim();
        const newHours = parseInt(document.getElementById(`edit-duration-hours-${id}`).value) || 0;
        const newMinutes = parseInt(document.getElementById(`edit-duration-minutes-${id}`).value) || 0;
        const newSeconds = parseInt(document.getElementById(`edit-duration-seconds-${id}`).value) || 0;

        if (newProjectName === '') {
            alert('A projekt neve nem lehet üres!');
            return;
        }

        const newDuration = (newHours * 3600) + (newMinutes * 60) + newSeconds;

        projectLog[entryIndex].projectName = newProjectName;
        projectLog[entryIndex].duration = newDuration;
        localStorage.setItem('projectLog', JSON.stringify(projectLog));
        renderLog();
        calculateSummary();
    });

    li.querySelector('.cancel-edit-btn').addEventListener('click', () => {
        renderLog(); // Just re-render to discard changes
    });
}

const clearAllBtn = document.getElementById('clear-all-btn');
clearAllBtn.addEventListener('click', clearAllLogs);


function calculateSummary() {
    const projectName = projectNameInput.value.trim();
    
    if (projectName !== '') {
        // Ha van megadott projekt, csak azt az egyet jelenítjük meg
        const filteredLog = projectLog.filter(entry => 
            entry.projectName.toLowerCase() === projectName.toLowerCase()
        );
        
        let totalDurationSeconds = 0;
        filteredLog.forEach(entry => {
            totalDurationSeconds += entry.duration;
        });
        
        const totalHours = totalDurationSeconds / 3600;
        const totalCost = totalHours * HOURLY_RATE;
        
        summaryContent.innerHTML = `
            <p><strong>Munkaidő (${projectName}):</strong> ${totalHours.toFixed(2)} óra</p>
            <p><strong>Költség (${projectName}):</strong> ${totalCost.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' })}</p>
        `;
    } else {
        // Ha nincs megadott projekt, minden projektet külön jelenítünk meg
        const projectSummary = {};
        
        // Összegyűjtjük a projekteket és időket
        projectLog.forEach(entry => {
            if (!projectSummary[entry.projectName]) {
                projectSummary[entry.projectName] = 0;
            }
            projectSummary[entry.projectName] += entry.duration;
        });
        
        let summaryHTML = '<h3>Projektek összesítése:</h3>';
        let grandTotalHours = 0;
        let grandTotalCost = 0;
        
        // Projektenként jelenítjük meg
        Object.keys(projectSummary).sort().forEach(project => {
            const hours = projectSummary[project] / 3600;
            const cost = hours * HOURLY_RATE;
            grandTotalHours += hours;
            grandTotalCost += cost;
            
            summaryHTML += `
                <div style="margin: 10px 0; padding: 10px; border-left: 3px solid #007bff; background-color: #f8f9fa;">
                    <p><strong>${project}:</strong> ${hours.toFixed(2)} óra</p>
                    <p><strong>Költség:</strong> ${cost.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' })}</p>
                </div>
            `;
        });
        
        // Végső összesítés
        summaryHTML += `
            <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; border: 2px solid #007bff;">
                <p><strong>ÖSSZES MUNKAIDŐ:</strong> ${grandTotalHours.toFixed(2)} óra</p>
                <p><strong>ÖSSZES KÖLTSÉG:</strong> ${grandTotalCost.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' })}</p>
            </div>
        `;
        
        summaryContent.innerHTML = summaryHTML;
    }
}

startStopBtn.addEventListener('click', function() {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
});

pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
calculateBtn.addEventListener('click', calculateSummary);

copySummaryBtn.addEventListener('click', () => {
    const summaryText = summaryContent.innerText;
    navigator.clipboard.writeText(summaryText).then(() => {
        alert('Összesítés a vágólapra másolva!');
    }).catch(err => {
        console.error('Hiba a másolás során:', err);
        alert('Nem sikerült a vágólapra másolni.');
    });
});

// Initial render of the log when the page loads
renderLog();
