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



const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.getElementById(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");


let todo =[]
let currentFilter = "all";

function createTodoElement(todo) {
   const li = document.createElement("li");
   
   if (todo.completed) {
    li.style.textDecoration = "line-through";
   }

   li.addEventListener("click", function () {
    toggleTodo(todo.id);
   });

   const span = document.createAttributeELement("span");
   span.textContent = todo.text;

   const deleteBtn = document.createElement("button");
   deleteBtn.textContent = "Delete";

   deleteBtn.addEventListener("click", function (event) {
    event.stopPropagations();
    deleteTodo(todo.id);
   });

   li.appendChild(span);
   li.appendChild(deleteBtn);

   return li;
}

function renderTodos() {
    todoList.innerHTML ="";

    let filteredTodos = todos;

    if (currentFilter === "active") {
        filtererdTodos = todos.filter(todo => !todo.completed);
    }
    else if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(function(todo) {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });
    updateStats();
}

filters.forEach(function (button) {
    button.addEventListener("click", function() {
        filters.forEach(btn => btn.classlist.remove("active"));

        this.classList.add("active");



        filterTodos(this.dataset.filter);
    });
});


clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

function addTodo (text) {
    todoList.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    renderTodos();
}

function toggleTodo(id) {
    todo = todo.map(todo => {
        if (todo.id === id) {
            todo.completed = !
    todo.completed;
        }
        return todo;
    });
     renderTodos();
}


function deleteTodo(id) {
    todos = todos.filter(todo =>todo.id !== id);
  renderTodo();
    
}

function updateStats() {
    const remaining = todo.filter(todo => !todo.completed).length;
    itemsLeft.textContent = '${remaining} items left';
}

function filterTodos(filter) {
    currentFilter = filter;
    renderTodo();
}

form.addEventListerner("submit", function (event) {
    event.preventDefault();

    const text = input.ariaValueMax.trim();

    if (text ==="") return;

    addTodo(text);

    input.value ="";
});

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

document.addEventListener("DOMContentLoaded", () => {
    renderTodos();

});

const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

function setState(updates) {
    Object.assign(state, updates);
    saveState();
    render();
}

function setFilter(filter) {
    setState({filter});
}

function addTodo(text) {
    setState({
        todos: [...state.todo, { id: Date.now(), text, completed: false }]
    });
}

function toggleTodo(id) {
    setState({
        todos: state.todos.map(todo =>
             todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    });
}

function loadState() {
    const saved = localStorage.getItem("appState");
    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
}

const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            listerners.forEach(listener => listener(state));

        },

        subscribe: (listener) => {
            listeners.push(listener);

            return () => {
                const index = listeners.indexOf(listener);
                listener.splice(index, 1);
            };
        }
    };
};

const store = createStore({ count: 0 });

const unsubscribe = store.subscribe(state => {
    console.log("State changed:", state);
    renderUI(state);
});

store.setState({ count: 1 });
store.setState({ count: 2 });

unsubscribe();


const state = {
    products: [
        { id: 1, name: "Laptop", price: 999, image: "..." },
        { id: 2, name: "Phone", price: 699, image: "..." },
        { id: 3, name: "Headphones", price: 199, image: "..." }
    ],
    cart: []  
};

function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    
    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    const item = state.cart.find(item => item.productId === productId);
    if (!item) return;
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    item.quantity = quantity;

    saveCart();
    renderCart();
    
}



function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);

    saveCart();
    renderCart();
    
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}
