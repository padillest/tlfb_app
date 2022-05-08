/* initialize the navigator and clicked date */
let nav = 0; 
let clicked = null; 

/* initialize the total sum variables */
let totalAlcSum = 0;
let totalCnbSum = 0; 
let totalCigSum = 0; 
let totalCsSum = 0;
let totalThcVSum = 0; 
let totalNicVSum = 0; 

/* initialize storage for inputs */ 
let alcEvent = localStorage.getItem("alcEvent") ? JSON.parse(localStorage.getItem("alcEvent")) : [];
let cnbEvent = localStorage.getItem("cnbEvent") ? JSON.parse(localStorage.getItem("cnbEvent")) : [];
let cigEvent = localStorage.getItem("cigEvent") ? JSON.parse(localStorage.getItem("cigEvent")) : [];
let csEvent = localStorage.getItem("csEvent") ? JSON.parse(localStorage.getItem("csEvent")) : [];
let thcVEvent = localStorage.getItem("thcVEvent") ? JSON.parse(localStorage.getItem("thcVEvent")) : [];
let nicVEvent = localStorage.getItem("nicVEvent") ? JSON.parse(localStorage.getItem("nicVEvent")) : [];

/* initialize lists for inputs */ 
let alcSum = [];
let cnbSum = [];
let cigSum = [];
let csSum = [];
let thcVSum = []; 
let nicVSum = [];

/* initialize data list */
let data = []; 


/* initialize calendar elements */ 
const calendar = document.getElementById("calendar");
const backDrop = document.getElementById("modalBackDrop");

const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");

const alcInput = document.getElementById("alcInput");
const cnbInput = document.getElementById("cnbInput");
const cigInput = document.getElementById("cigInput");
const csInput = document.getElementById("csInput");
const thcVInput = document.getElementById("thcVInput");
const nicVInput = document.getElementById("nicVInput");

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
    totalCnbSum = cnbSum.reduce((a, b) => a + b, 0);
    totalCigSum = cigSum.reduce((a, b) => a + b, 0);
    totalCsSum = csSum.reduce((a, b) => a + b, 0);
    totalThcVSum = thcVSum.reduce((a, b) => a + b, 0);
    totalNicVSum = nicVSum.reduce((a, b) => a + b, 0);

    data.push([
        "total_alc",
        totalAlcSum
    ])

    data.push([
        "total_cnb",
        totalCnbSum
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
        "total_thcV",
        totalThcVSum
    ])

    data.push([
        "total_nicV",
        totalNicVSum
    ])

    downloadCsv();

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
    thcVInput.checked = false;
    nicVInput.checked = false; 

    // finding if data has already been entered on a selected date 
    const alcEventForDay = alcEvent.find(e => e.date === clicked);
    const cnbEventForDay = cnbEvent.find(e => e.date === clicked);
    const cigEventForDay = cigEvent.find(e => e.date === clicked);
    const csEventForDay = csEvent.find(e => e.date === clicked);
    const thcVEventForDay = thcVEvent.find(e => e.date === clicked);
    const nicVEventForDay = nicVEvent.find(e => e.date === clicked);

    // check if data has already been entered on a selected date 
    if (alcEventForDay || cnbEventForDay || cigEventForDay || csEventForDay || thcVEventForDay || nicVEventForDay) { 

        if (alcEventForDay) { 
            document.getElementById("alcText").innerText = alcEventForDay.val;
        }

        if (cnbEventForDay) { 
            document.getElementById("cnbText").innerText = cnbEventForDay.val; 
        }

        if (cigEventForDay) { 
            document.getElementById("cigText").innerText = cigEventForDay.val;
        }

        if (csEventForDay) { 
            document.getElementById("csText").innerText = csEventForDay.val;
        }

        if (thcVEventForDay) { 
            document.getElementById("thcVText").innerText = thcVEventForDay.val;
        }

        if (nicVEventForDay) { 
            document.getElementById("nicVText").innerText = nicVEventForDay.val;
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
    cnbSum = [];
    cigSum = [];
    csSum = [];
    thcVSum = [];
    nicVSum = [];

    // pushing all input data to their respective list
    for (let a = 0; a < alcEvent.length; a++) { 
        alcSum.push(alcEvent[a].val);
    }

    for (let b = 0; b < cnbEvent.length; b++) { 
        cnbSum.push(cnbEvent[b].val);
    }

    for (let c = 0; c < cigEvent.length; c++) { 
        cigSum.push(cigEvent[c].val);
    }

    for (let d = 0; d < csEvent.length; d++) { 
        csSum.push(csEvent[d].val);
    }

    for (let e = 0; e < thcVEvent.length; e++) { 
        thcVSum.push(thcVEvent[e].val);
    }

    for (let f = 0; f < nicVEvent.length; f++) { 
        nicVSum.push(nicVEvent[f].val);
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
            const cnbEventForDay = cnbEvent.find(e => e.date === dayString);
            const cigEventForDay = cigEvent.find(e => e.date === dayString);
            const csEventForDay = csEvent.find(e => e.date === dayString);
            const thcVEventForDay = thcVEvent.find(e => e.date === dayString);
            const nicVEventForDay = nicVEvent.find(e => e.date === dayString);
    
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
    
            if (alcEventForDay || cnbEventForDay || cigEventForDay || csEventForDay || thcVEventForDay || nicVEventForDay) { 
    
                if (alcEventForDay) { 
    
                    const alcDiv = document.createElement("alcDiv"); 
                    alcDiv.classList.add("alcEvent");
                    alcDiv.innerText = alcEventForDay.val;
                    daySquare.appendChild(alcDiv);
    
                } 
    
                if (cnbEventForDay) { 
    
                    const cnbDiv = document.createElement("cnbDiv"); 
                    cnbDiv.classList.add("cnbEvent");
                    cnbDiv.innerText = cnbEventForDay.val;
                    daySquare.appendChild(cnbDiv);
    
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
    
                if (thcVEventForDay) { 
    
                    const thcVDiv = document.createElement("thcVDiv"); 
                    thcVDiv.classList.add("thcVEvent");
                    thcVDiv.innerText = "VTHC"
                    daySquare.appendChild(thcVDiv);
    
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
    cnbInput.classList.remove("error");
    cigInput.classList.remove("error");

    newEventModal.style.display = "none"; 
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";

    alcInput.value = "";
    cnbInput.value = "";
    cigInput.value = "";
    csInput.value = "";

    clicked = null;
    load();

}

/** 
 * save input data
 */

function saveEvent() {

    if (alcInput.value || cnbInput.value || cigInput.value || csInput.checked || thcVInput.checked || nicVInput.checked) { 

        if (alcInput.value) { 

            alcEvent.push({
                date: clicked,
                val: parseFloat(alcInput.value) 
            })

            localStorage.setItem("alcEvent", JSON.stringify(alcEvent));

        }

        if (cnbInput.value) { 

            cnbEvent.push({
                date: clicked,
                val: parseFloat(cnbInput.value) 
            })

            localStorage.setItem("cnbEvent", JSON.stringify(cnbEvent));

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

        if (thcVInput.checked) { 

            thcVEvent.push({
                date: clicked,
                val: 1
            })

            localStorage.setItem("thcVEvent", JSON.stringify(thcVEvent));

        }

        if (nicVInput.checked) { 

            nicVEvent.push({
                date: clicked,
                val: 1
            })

            localStorage.setItem("nicVEvent", JSON.stringify(nicVEvent));

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

    cnbEvent = cnbEvent.filter(e => e.date !== clicked);
    localStorage.setItem("cnbEvent", JSON.stringify(cnbEvent));

    cigEvent = cigEvent.filter(e => e.date !== clicked);
    localStorage.setItem("cigEvent", JSON.stringify(cigEvent));

    csEvent = csEvent.filter(e => e.date !== clicked);
    localStorage.setItem("csEvent", JSON.stringify(csEvent));

    thcVEvent = thcVEvent.filter(e => e.date !== clicked);
    localStorage.setItem("thcVEvent", JSON.stringify(thcVEvent));

    nicVEvent = nicVEvent.filter(e => e.date !== clicked);
    localStorage.setItem("nicVEvent", JSON.stringify(nicVEvent));

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

    document.getElementById("downLoadButton").addEventListener("click", exportData);

}

initButtons();
load();