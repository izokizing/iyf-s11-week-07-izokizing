localStorage.setItem("username", "john");
const username = localStorage.getItem("username");
console.log(username);
localStorage.removeItem("username");
localStorage.clear();

if (loadStorage.getItem("username")) {
    console.log("User exists");
}


const user = {
    name:"john",
    age: 30,
    hobbies: ["coding", "reading"]
};

localStorage.setItem("user", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log(retrieved);


function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));

}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

saveToStorage("settings", { theme: "dark", fontSize: 16 });
const settings = getFromStorage("setting", { theme: "light", fontSize: 14 });



function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

let notes = getFromStorage("notes");

function renderNotes() {
    const noteList = document.getElementById("notesList");
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveToStorage("notes", notes);
            renderNotes();
        });
        
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

document.getElementById("saveBtn").addEventListener("click", () => {
    const input = document.getElementById("noteInput");

    if (input.value.trim() !== "") {
        note.push(input.value);
        saveToStorage("notes", notes);
        input.value = "";
        renderNotes();
    }
});

renderNotes();
