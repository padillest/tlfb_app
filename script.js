/* initialize the navigator and clicked date */
let nav = 0; 
let clicked = null; 

/* initialize the total sum variables */
let totalAlcSum = 0;
let totalMrjSum = 0; 
let totalCigSum = 0; 
let totalCsSum = 0;
let totalNonMrjVSum = 0; 
let totalNicVSum = 0; 
let bingeCount = 0;

/* initialize storage for inputs */ 
let alcEvent = localStorage.getItem("alcEvent") ? JSON.parse(localStorage.getItem("alcEvent")) : [];
let mrjEvent = localStorage.getItem("mrjEvent") ? JSON.parse(localStorage.getItem("mrjEvent")) : [];
let cigEvent = localStorage.getItem("cigEvent") ? JSON.parse(localStorage.getItem("cigEvent")) : [];
let csEvent = localStorage.getItem("csEvent") ? JSON.parse(localStorage.getItem("csEvent")) : [];
let nonMrjVEvent = localStorage.getItem("nonMrjVEvent") ? JSON.parse(localStorage.getItem("nonMrjVEvent")) : [];
let nicVEvent = localStorage.getItem("nicVEvent") ? JSON.parse(localStorage.getItem("nicVEvent")) : [];

let dayNoteEvent = localStorage.getItem("dayNoteEvent") ? JSON.parse(localStorage.getItem("dayNoteEvent")) : [];





/* initialize lists for inputs */ 
let alcSum = [];
let mrjSum = [];
let cigSum = [];
let csSum = [];
let nonMrjVSum = []; 
let nicVSum = [];
let dayNote = []


/* initialize data list */
let data = []; 


/* initialize calendar elements */ 
const calendar = document.getElementById("calendar");
const backDrop = document.getElementById("modalBackDrop");

const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");

const alcInput = document.getElementById("alcInput");
const mrjInput = document.getElementById("mrjInput");
const cigInput = document.getElementById("cigInput");
const csInput = document.getElementById("csInput");
const nonMrjVInput = document.getElementById("nonMrjVInput");
const nicVInput = document.getElementById("nicVInput");

const dayNoteInput = document.getElementById("dayNoteInput");

/* initialize sex elements */

let sex = null;

const sexModal = document.getElementById("sexModal"); 

const maleInput = document.getElementById("maleInput");
const femaleInput = document.getElementById("femaleInput");




/* initialize weekdays */ 
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * validates the date
 * @param {Int} day the day (number) based on the calendar
 * @return {Boolean} determines if the date is a validate date 
 */

function validateDate(day) { 

    const dt = new Date(); 

    if(dt.getDate() === day) { 

        return true;

    } else {

        return false;

    }
}

/**
 * exports input lists to data list 
 */

function exportData() {  

    totalAlcSum = alcSum.reduce((a, b) => a + b, 0);
    totalMrjSum = mrjSum.reduce((a, b) => a + b, 0);
    totalCigSum = cigSum.reduce((a, b) => a + b, 0);
    totalCsSum = csSum.reduce((a, b) => a + b, 0);
    totalNonMrjVSum = nonMrjVSum.reduce((a, b) => a + b, 0);
    totalNicVSum = nicVSum.reduce((a, b) => a + b, 0);

    data.push([
        "sex",
        sex
    ])
    data.push([
        "num_drink_days",
        alcSum.length
    ])

    data.push([
        "total_alc_sd",
        totalAlcSum
    ])

    data.push([
        "num_mrj_days",
        mrjSum.length
    ])

    data.push([
        "total_mrj_g",
        totalMrjSum
    ])

    data.push([
        "num_cig_days",
        cigSum.length
    ])

    data.push([
        "total_cig",
        totalCigSum
    ])

    data.push([
        "total_cs",
        totalCsSum
    ])

    data.push([
        "num_nonMrj_days",
        totalNonMrjVSum
    ])

    data.push([
        "total_nicV",
        totalNicVSum
    ])
    
    data.push([
        "total_binge",
        bingeCount
    ])

    data.push([
        "other_sub",
        dayNote.join("/")
    ])

    downloadCsv();

}

/**
 * determines the participant sex to calculate the number of binge days
 */
function determineSex() { 

    sexModal.style.display = "block";

}

function saveSex() { 

    if (maleInput.checked) { 

        sex = "male";

    }

    if (femaleInput.checked) { 

        sex = "female"; 

    }

    var size = alcSum.length;

    if (sex == "male") { 

        for (let i = 0; i < size; i++) { 

            if (alcSum[i] >= 5) { 

                bingeCount++;
            }
            
        }

    }

    if (sex == "female") { 

        for (let i = 0; i < size; i++) { 

            if (alcSum[i] >= 4) { 

                bingeCount++;
            }
            
        }

    }

    exportData();

}

/**
 * download the data as a csv file 
 */

function downloadCsv() { 

    var csv = "name,amount\n";

    data.forEach(function(row) { 

        csv += row.join(",");
        csv += "\n";

    });

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);

    hiddenElement.target = "_blank";
    hiddenElement.download = "tlfb_data.csv";
    hiddenElement.click();

}

/**
 * open the modal of each day 
 * @param {Date()} date the date of the day clicked 
 */

function openModal(date) {

    clicked = date;

    csInput.checked = false;
    nonMrjVInput.checked = false;
    nicVInput.checked = false; 

    // finding if data has already been entered on a selected date 
    const alcEventForDay = alcEvent.find(e => e.date === clicked);
    const mrjEventForDay = mrjEvent.find(e => e.date === clicked);
    const cigEventForDay = cigEvent.find(e => e.date === clicked);
    const csEventForDay = csEvent.find(e => e.date === clicked);
    const nonMrjVEventForDay = nonMrjVEvent.find(e => e.date === clicked);
    const nicVEventForDay = nicVEvent.find(e => e.date === clicked);

    const dayNoteEventForDay = dayNoteEvent.find(e => e.date === clicked);

    // check if data has already been entered on a selected date 
    if (alcEventForDay || mrjEventForDay || cigEventForDay || csEventForDay || nonMrjVEventForDay || nicVEventForDay || dayNoteEventForDay) { 

        if (alcEventForDay) { 
            document.getElementById("alcText").innerText = alcEventForDay.val;
        }

        if (mrjEventForDay) { 
            document.getElementById("mrjText").innerText = mrjEventForDay.val; 
        }

        if (cigEventForDay) { 
            document.getElementById("cigText").innerText = cigEventForDay.val;
        }

        if (csEventForDay) { 
            document.getElementById("csText").innerText = csEventForDay.val;
        }

        if (nonMrjVEventForDay) { 
            document.getElementById("nonMrjVText").innerText = nonMrjVEventForDay.val;
        }

        if (nicVEventForDay) { 
            document.getElementById("nicVText").innerText = nicVEventForDay.val;
        }

        if (dayNoteEventForDay) { 
            document.getElementById("dayNoteText").innerText = "Notes: " + dayNoteEventForDay.val;
        }

        deleteEventModal.style.display = "block";

    } else { 

        newEventModal.style.display = "block"; 

    }

    backDrop.style.display = "block";

}

/** 
 * reloads the application when changing months and inputting data 
 */

function load() { 

    // initialize empty lists of the input data 
    alcSum = [];
    mrjSum = [];
    cigSum = [];
    csSum = [];
    nonMrjVSum = [];
    nicVSum = [];


    dayNote = [];

    // pushing all input data to their respective list
    for (let a = 0; a < alcEvent.length; a++) { 
        alcSum.push(alcEvent[a].val);
    }

    for (let b = 0; b < mrjEvent.length; b++) { 
        mrjSum.push(mrjEvent[b].val);
    }

    for (let c = 0; c < cigEvent.length; c++) { 
        cigSum.push(cigEvent[c].val);
    }

    for (let d = 0; d < csEvent.length; d++) { 
        csSum.push(csEvent[d].val);
    }

    for (let e = 0; e < nonMrjVEvent.length; e++) { 
        nonMrjVSum.push(nonMrjVEvent[e].val);
    }

    for (let f = 0; f < nicVEvent.length; f++) { 
        nicVSum.push(nicVEvent[f].val);
    }

    for (let g = 0; g < dayNoteEvent.length; g++) { 
        dayNote.push(dayNoteEvent[g].val);
    }

    // initialize the current data 
    const dt = new Date();

    // check the month from the navigation value 
    if (nav !== 0) { 

        dt.setMonth(new Date().getMonth() + nav);

    }

    // initialize the components of the current date 
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    

    // verify that the current calendar date is a valid date 
    if (validateDate(day) === false) { 
        
        dt.setMonth(new Date().getMonth() + nav); 
        day = 28;
        month = 1; 

    }

    // initialize the value of the first day of the month 
    const firstDayOfMonth = new Date(year, month, 1);

    // initialize the number of days in the given month 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // initialize the date as a string 
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {

        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",

    });

    // initialize the value of days not in the given month 
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    // initialize the end date of the 90 day period 
    const endDate = new Date(); 
    endDate.setDate(endDate.getDate() - 91);

    const endDateString = endDate.toLocaleDateString("en-us", {

        weekday: "long",
        year: "numeric",
        month: "numeric", 
        day: "numeric",

    });

    const endDay = endDate.getDate(); 

    // format the label to include the calendar month and year 
    document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;

    calendar.innerHTML = "";

    // input the days of the month 
    for (let i = 1; i <= paddingDays + daysInMonth; i++) { 

        // initialize each day
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    
        if (i > paddingDays) {
    
            daySquare.innerText = i - paddingDays; 
    
            // check if data has been inputted for a given date 
            const alcEventForDay = alcEvent.find(e => e.date === dayString);
            const mrjEventForDay = mrjEvent.find(e => e.date === dayString);
            const cigEventForDay = cigEvent.find(e => e.date === dayString);
            const csEventForDay = csEvent.find(e => e.date === dayString);
            const nonMrjVEventForDay = nonMrjVEvent.find(e => e.date === dayString);
            const nicVEventForDay = nicVEvent.find(e => e.date === dayString);



            const dayNoteEventForDay = dayNoteEvent.find(e => e.date === dayString);
    
            // initialize the timeline followback start date
            const startDay = day - 1;
        
            if (nav >= -3 && nav <= 0) { 
    
                if (nav === -3) { 
    
                    if (i - paddingDays >= endDay) { 
    
                        daySquare.id = "periodDay";
    
                    }
    
                } else if (nav === 0) { 
    
                    if (i - paddingDays <= startDay) { 
                            
                        daySquare.id = "periodDay";
    
                    }
                
                } else if (nav > -3 && nav < 0) { 
    
                    daySquare.id = "periodDay";
    
                }
    
            }
    
            if (alcEventForDay || mrjEventForDay || cigEventForDay || csEventForDay || nonMrjVEventForDay || nicVEventForDay) { 
    
                if (alcEventForDay) { 
    
                    const alcDiv = document.createElement("alcDiv"); 
                    alcDiv.classList.add("alcEvent");
                    alcDiv.innerText = alcEventForDay.val;
                    daySquare.appendChild(alcDiv);
    
                } 
    
                if (mrjEventForDay) { 
    
                    const mrjDiv = document.createElement("mrjDiv"); 
                    mrjDiv.classList.add("mrjEvent");
                    mrjDiv.innerText = mrjEventForDay.val;
                    daySquare.appendChild(mrjDiv);
    
                } 
    
                if (cigEventForDay) { 
    
                    const cigDiv = document.createElement("cigDiv"); 
                    cigDiv.classList.add("cigEvent");
                    cigDiv.innerText = cigEventForDay.val;
                    daySquare.appendChild(cigDiv);
    
                } 
    
                if (csEventForDay) { 
    
                    const csDiv = document.createElement("csDiv"); 
                    csDiv.classList.add("csEvent");
                    csDiv.innerText = "CS";
                    daySquare.appendChild(csDiv);
    
                } 
    
                if (nonMrjVEventForDay) { 
    
                    const nonMrjVDiv = document.createElement("nonMrjVDiv"); 
                    nonMrjVDiv.classList.add("nonMrjVEvent");
                    nonMrjVDiv.innerText = "VTHC"
                    daySquare.appendChild(nonMrjVDiv);
    
                } 
    
                if (nicVEventForDay) { 
    
                    const nicVDiv = document.createElement("nicVDiv"); 
                    nicVDiv.classList.add("nicVEvent");
                    nicVDiv.innerText = "VNIC"
                    daySquare.appendChild(nicVDiv);
    
                } 
                
            }

            daySquare.addEventListener("click", () => openModal(dayString));

        } else { 
    
            daySquare.classList.add("padding");
    
        }
    
        calendar.appendChild(daySquare);
    }
}

/** 
 * closes modal 
 */

function closeModal() { 

    alcInput.classList.remove("error");
    mrjInput.classList.remove("error");
    cigInput.classList.remove("error");

    newEventModal.style.display = "none"; 
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";

    alcInput.value = "";
    mrjInput.value = "";
    cigInput.value = "";
    csInput.value = "";

    clicked = null;
    load();

}

/** 
 * save input data
 */

function saveEvent() {

    if (alcInput.value || mrjInput.value || cigInput.value || csInput.checked || nonMrjVInput.checked || nicVInput.checked || dayNoteInput.value) { 

        if (alcInput.value) { 

            alcEvent.push({
                date: clicked,
                val: parseFloat(alcInput.value) 
            })

            localStorage.setItem("alcEvent", JSON.stringify(alcEvent));

        }

        if (mrjInput.value) { 

            mrjEvent.push({
                date: clicked,
                val: parseFloat(mrjInput.value) 
            })

            localStorage.setItem("mrjEvent", JSON.stringify(mrjEvent));

        }

        if (cigInput.value) { 

            cigEvent.push({
                date: clicked,
                val: parseFloat(cigInput.value) 
            })

            localStorage.setItem("cigEvent", JSON.stringify(cigEvent));

        }

        if (csInput.checked) { 

            csEvent.push({
                date: clicked,
                val: 1
            })

            localStorage.setItem("csEvent", JSON.stringify(csEvent));

        }

        if (nonMrjVInput.checked) { 

            nonMrjVEvent.push({
                date: clicked,
                val: 1
            })

            localStorage.setItem("nonMrjVEvent", JSON.stringify(nonMrjVEvent));

        }

        if (nicVInput.checked) { 

            nicVEvent.push({
                date: clicked,
                val: 1
            })

            localStorage.setItem("nicVEvent", JSON.stringify(nicVEvent));

        }

        if (dayNoteInput.value) {

            dayNoteEvent.push({
                date: clicked,
                val: dayNoteInput.value
            })

            localStorage.setItem("dayNoteEvent", JSON.stringify(dayNoteEvent));

        }

    }

    closeModal();

}

/** 
 * deletes all events from a given date 
 */

function deleteEvent() { 

    alcEvent = alcEvent.filter(e => e.date !== clicked);
    localStorage.setItem("alcEvent", JSON.stringify(alcEvent));

    mrjEvent = mrjEvent.filter(e => e.date !== clicked);
    localStorage.setItem("mrjEvent", JSON.stringify(mrjEvent));

    cigEvent = cigEvent.filter(e => e.date !== clicked);
    localStorage.setItem("cigEvent", JSON.stringify(cigEvent));

    csEvent = csEvent.filter(e => e.date !== clicked);
    localStorage.setItem("csEvent", JSON.stringify(csEvent));

    nonMrjVEvent = nonMrjVEvent.filter(e => e.date !== clicked);
    localStorage.setItem("nonMrjVEvent", JSON.stringify(nonMrjVEvent));

    nicVEvent = nicVEvent.filter(e => e.date !== clicked);
    localStorage.setItem("nicVEvent", JSON.stringify(nicVEvent));


    dayNoteEvent = dayNoteEvent.filter(e => e.date !== clicked);
    localStorage.setItem("dayNoteEvent", JSON.stringify(dayNoteEvent));

    closeModal();

}

/**
 * initialize all buttons 
 */

function initButtons() { 

    document.getElementById("nextButton").addEventListener("click", () => { 

        nav++;
        load();

    })

    document.getElementById("backButton").addEventListener("click", () => { 

        nav--;
        load();
        
    })

    document.getElementById("saveButton").addEventListener("click", saveEvent);

    document.getElementById("cancelButton").addEventListener("click", closeModal);

    document.getElementById("deleteButton").addEventListener("click", deleteEvent);

    document.getElementById("closeButton").addEventListener("click", closeModal);

    document.getElementById("downLoadButton").addEventListener("click", determineSex);

    document.getElementById("confirmButton").addEventListener("click", saveSex);

}

initButtons();
load();