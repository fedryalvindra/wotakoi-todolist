function displayTodo () {
    clearTodo();
    todoList.forEach(function(value, index) {
        const pTodoContent = document.createElement("p");
        pTodoContent.textContent = todoList[index].todo; 
        pTodoContent.className = "content";
        const pDateContent = document.createElement("p");
        pDateContent.textContent = todoList[index].date;
        pDateContent.className = "timeAndDate";
        
        const searchInput = document.getElementById("search").value.toLowerCase();
        if (todoList[index].todo.toLowerCase().includes(searchInput)) {
            addTodo(index, pTodoContent, pDateContent);
        }
    });
    arrCorrectionStyle(todoList);
}

function dateConvert (date) {
    const dd = date.getDate();
    const mm = date.getMonth();
    const yy = date.getFullYear();
    const ddmmyy = `${dd} - ${mm} - ${yy}`;
    return ddmmyy;
}

function arrCorrectionStyle (todoList) {
    const todolistForm = document.forms["todoList"]; 
    if (todoList[0] == null) {
        todolistForm.style.padding = "20px 20px 0px 20px";
    } else {
        todolistForm.style.padding = "20px";  
    }
}

function addTodo(index, pTodoContent, pDateContent) {
    const inputDone = document.createElement("input");
    inputDone.value = "Done";
    inputDone.className = "doneBtn";
    inputDone.type = "button";

    inputDone.onclick =  function() {
        removeTodo(index);
    }
    
    const divListTodo = document.createElement("div");
    divListTodo.className = "listTodo";
    divListTodo.appendChild(pTodoContent);
    divListTodo.appendChild(pDateContent);

    const divListTodoContainer = document.createElement("div");
    divListTodoContainer.className = "listTodoContainer";
    divListTodoContainer.appendChild(inputDone);
    divListTodoContainer.appendChild(divListTodo);

    const bodyContainer = document.getElementById("bodyContainer");
    bodyContainer.appendChild(divListTodoContainer);
}

function removeTodo(index) {
    todoList.splice(index ,1);
    displayTodo();
}

function clearTodo() {
    const bodyContainer = document.getElementById("bodyContainer");
    while(bodyContainer.firstChild) {
        bodyContainer.removeChild(bodyContainer.firstChild);
    }
}

class TodoList {
    constructor(todo, date) {
        this.todo = todo;
        this.date = date;
    }
}

const todoList = [];

document.forms["todoInput"].onsubmit = function (event) {
    const inputTodo = document.forms["todoInput"]["inputTodo"].value;
    const inputDate = document.forms["todoInput"]["inputDate"].value;
    const date = Date.parse(inputDate);
    const todoDate = new Date(date);
    const todo = new TodoList(inputTodo, dateConvert(todoDate));
    todoList.push(todo);
    console.log(todoList); 
    displayTodo();
    event.preventDefault();
    document.forms["todoInput"].reset();
}

document.forms["todoList"]["search"].onkeyup = function () {
    displayTodo();
}

document.forms["todoList"]["search"].onkeydown = function () {
    displayTodo();
}