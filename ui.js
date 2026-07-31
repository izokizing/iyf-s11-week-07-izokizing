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
