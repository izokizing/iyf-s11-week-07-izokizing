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
