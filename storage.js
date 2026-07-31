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

const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");

inputs.forEach(input => {
    const saved = sessionStorage.getItem(`form_${input.name}`);
    if (saved) {
        input.value = saved;
    }

    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
    });
});

form.addEventListener("submit", () => {
    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
    });
});

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


const STORAGE_KEY = "todos";

function loadTodos() {
    return getFromStorage(STORAGE_KEY, []);

}

function saveTodos(todos) {
    seveToStorage(STORAGE_KEY, todos);
}

function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    const todos = loadTodos();
    todos.push(newTodo);
    saveTodos(todos);

    renderTodos();
}

function toggleTodo(id) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    let todos = loadTodos();
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    renderTodos();
}

function loadState() {
    const saved = localStorage.getItem("appState");
    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
}

