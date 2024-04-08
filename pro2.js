let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


function getTodoListFromLocalStorage()
{
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodList = JSON.parse(stringifiedTodoList);
    if (parsedTodList === null)
    {
        return [];
    }
    else
    {
        return parsedTodList;
    }
}
let todoList  = getTodoListFromLocalStorage();

saveTodoButton.onclick = function()
{
    localStorage.setItem("todoList", JSON.stringify(todoList));

};


function onTodoStatusChange(checkboxId, labelId, todoId)
{
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    if(checkboxElement.checked === true)
    {
        labelElement.classList.add("checked");
    }
    else
    {
        labelElement.classList.remove("checked");
    }
    let todoObjectIndex = todoList.findIndex(function(eachTodo)
    {
        let eachTodoId = "todo"+eachTodo.uniqueNo;
        if(eachTodoId===todoId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    let todoObject=todoList[todoObjectIndex];
    if (todoObject.isChecked === true)
    {
        todoObject.isChecked=false;
    }
    else
    {
        todoObject.isChecked=true;
    }
}


function onDeleteTodo(todoId)
{
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteElementIndex = todoList.findIndex(function (eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}

let todosCount = todoList.length;
function onAddTodo()
{
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue==="")
    {
        alert("Enter valid input");
        return;
    }
    todosCount = todosCount+1;
    let newTodo={
        text : userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value="";
}


addTodoButton.onclick = function()
{
    onAddTodo();
}


function createAndAppendTodo(todo)
{
    let todoElement = document.createElement("li");
    let todoId = "todo" + todo.uniqueNo;
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type="checkbox";
    let checkboxId = "checkbox" + todo.uniqueNo;
    inputElement.id= checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function()
    {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    let labelId = "label"+todo.uniqueNo;
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent= todo.text;
    if(todo.isChecked === true)
    {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
    deleteIcon.onclick = function()
    {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}


for (let todo of todoList)
{
    createAndAppendTodo(todo);
}