let input = document.getElementById("input");
let add = document.getElementById("add");
let maincont = document.getElementById("cont");
let body = document.getElementById("body");
let settings = document.getElementById("settings");
let settingIcon = document.getElementById("icon-setting");

let isWhite = true; // Move this outside the function
let show = false;

// Load existing habits from localStorage
window.addEventListener("load", function() {
    let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits.forEach(function(habit) {
        createHabitElement(habit.name, habit.description);
    });
});

add.addEventListener("click", function() {
    if (input.value.trim() !== "") {
        createHabitElement(input.value, "");

        let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
        storedHabits.push({ name: input.value, description: "" });
        localStorage.setItem("habits", JSON.stringify(storedHabits));

        input.value = ""; // Clear input after adding
    } else {
        alert("Please enter a habit name");
    }
});

function createHabitElement(name, description) {
    let cont = document.createElement("div");
    cont.classList.add("small-cont");
    maincont.append(cont);

    let nameElement = document.createElement("h2");
    nameElement.textContent = name;
    cont.append(nameElement);

    let desc = document.createElement("textarea");
    desc.readOnly = true;
    desc.placeholder = description || "No Description yet..";
    desc.classList.add("desc");
    desc.value = description;
    cont.append(desc);

    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = "Edit";
    cont.append(edit);

    let isChange = true;
    edit.addEventListener("click", function() {
        if (isChange) {
            desc.readOnly = false;
            edit.textContent = "Done";
        } else {
            desc.readOnly = true;
            edit.textContent = "Edit";

            // Update localStorage when done editing
            let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
            let habitIndex = storedHabits.findIndex(h => h.name === name);
            if (habitIndex !== -1) {
                storedHabits[habitIndex].description = desc.value;
                localStorage.setItem("habits", JSON.stringify(storedHabits));
            }
        }
        isChange = !isChange;
    });

    let btncont = document.createElement("div");
    btncont.classList.add("btn-cont");

    let done = document.createElement("button");
    done.classList.add("done");
    done.textContent = "Done";
    btncont.append(done);

    let remove = document.createElement("button");
    remove.classList.add("delete");
    remove.textContent = "Delete";
    btncont.append(remove);
    cont.append(btncont);

    done.addEventListener("click", function() {
        let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
        storedHabits = storedHabits.filter(habit => habit.name !== name);
        localStorage.setItem("habits", JSON.stringify(storedHabits));

        cont.remove();
    });

    remove.addEventListener("click", function() {
        let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
        storedHabits = storedHabits.filter(habit => habit.name !== name);
        localStorage.setItem("habits", JSON.stringify(storedHabits));

        cont.remove();
    });
}

/* Settings */
settingIcon.src = "settings1.png"
settings.addEventListener("click", function() {
    show = !show;
    let sidebar = document.getElementById("sidebar");
    if (show === true) {
        sidebar.style.display = "block";
        settings.style.marginLeft = "80px";
    } else if(show === false){
        sidebar.style.display = "none";
        settings.style.marginLeft = "0px";
    }
});

/* Dark Mode Toggle */
let whitebtn = document.getElementById("white");
let blackbtn = document.getElementById("black");
let setbtn = document.getElementById("settings");

blackbtn.addEventListener("click", function() {
    isWhite = false;
    setbtn.style.backgroundColor = "#282828"
    setbtn.style.borderColor = "#f0f0f0"
    document.querySelectorAll("header").forEach(hea => {
        hea.style.backgroundColor = "#121212"
    })
    document.querySelectorAll("h2").forEach(p => {
        p.style.color = "white"
    })
    document.querySelectorAll("div").forEach(div => {
        div.style.backgroundColor = "#282828";
        div.style.color = "white";
    });
    body.style.backgroundColor = "#1e1e1e";
});

whitebtn.addEventListener("click", function() {
    isWhite = true;
    setbtn.style.backgroundColor = "#f0f0f0";
    setbtn.style.borderColor = "#121212"
    document.querySelectorAll("header").forEach(hea => {
        hea.style.backgroundColor = "#f0f0f0"
    })
    document.querySelectorAll("h2").forEach(p => {
        p.style.color = "black"
    })
    document.querySelectorAll("div").forEach(div => {
        div.style.backgroundColor = "white";
        div.style.color = "black";
    });
    body.style.backgroundColor = "#e8e8e8";
});
