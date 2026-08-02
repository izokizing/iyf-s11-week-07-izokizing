




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
