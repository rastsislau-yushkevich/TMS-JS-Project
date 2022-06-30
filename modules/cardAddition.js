import { watch, convertTime } from "./time.js"
import { showCardsFromLocalStorage } from "./workWithLocalStorage.js"

let todoColumn = document.getElementById("todo-column");
let progressColumn = document.getElementById("progress-column");
let doneColumn = document.getElementById("done-column");
let doneBtn = document.getElementById("done-btn");
let addTodoBtn = document.getElementById("confirm");

let createTodoBtn = document.getElementById("todo-btn");
let modal = document.getElementById("simpleModal");
let closeBtn = document.getElementById("cancel");
let select = document.getElementById("userSelect");
let titleValue = document.getElementById("title");
let descValue = document.getElementById("description");


let todos = [];
if(localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

addTodoBtn.addEventListener("click", createCard);

function createCard() {
    let card = document.createElement("div");
    card.classList.add("main__column-card");
    card.classList.add("todo");

    let cardList = document.createElement("ul");
    let firstLi = document.createElement("li");
    let secLi = document.createElement("li");
    let thirdLi = document.createElement("li");
    let innerDiv = document.createElement("div");
    
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";

    let progressBtn = document.createElement("button");
    progressBtn.innerHTML = ">";

    let userSpan = document.createElement("span");
    userSpan.innerHTML = select.value;

    let userWatch = document.createElement("span");
    userWatch.innerHTML = convertTime(String(watch));

    let titleSpan = document.createElement("span");
    let descSpan = document.createElement("span");

    titleSpan.innerHTML = titleValue.value;
    descSpan.innerHTML = descValue.value;

    let cardObj = {
        id: todos.length+1,
        user: userSpan.innerHTML,
        title: titleSpan.innerHTML,
        desc: descSpan.innerHTML,
        time: userWatch.innerHTML,
        status: "todo"
    }

    todos.push(cardObj);
    localStorage.setItem("todos", JSON.stringify(todos));

    card.append(cardList);
    innerDiv.append(editBtn, deleteBtn);
    firstLi.append(titleSpan, innerDiv);
    secLi.append(descSpan, progressBtn);
    thirdLi.append(userSpan, userWatch);
    cardList.append(firstLi, secLi, thirdLi);

    todoColumn.append(card);

    closeModal();

    editBtn.addEventListener("click", () => {
        openModal();

        console.log(todos);

        todos.forEach((item, index) => {
            if(item.id == cardObj.id) {
                todos.splice(index, 1);
            }
        });

        localStorage.setItem("todos", JSON.stringify(todos));
        card.remove();
        
    });

    progressBtn.addEventListener("click", () => {
        card.classList.remove("todo");
        card.classList.add("progress");

        deleteBtn.remove();
        editBtn.remove();
        progressBtn.remove();
    
        let backBtn = document.createElement("button");
        backBtn.innerHTML = "BACK";
        let completeBtn = document.createElement("button");
        completeBtn.innerHTML = "COMPLETE";
    
        innerDiv.append(backBtn, completeBtn);
        progressColumn.append(card);

        todos = JSON.parse(localStorage.getItem("todos"));
        console.log("todos", todos);

        todos[cardObj.id-1].status = "progress";

        localStorage.setItem("todos", JSON.stringify(todos));

        backBtn.addEventListener("click", () => {
            card.classList.remove("progress");
            card.classList.add("todo");

            backBtn.remove();
            completeBtn.remove();

            innerDiv.append(editBtn, deleteBtn);
            secLi.append(progressBtn);
            todoColumn.append(card);

            todos[cardObj.id-1].status = "todo";

            localStorage.setItem("todos", JSON.stringify(todos));
        });

        completeBtn.addEventListener("click", () => {
            card.classList.remove("progress");
            card.classList.add("done");

            backBtn.remove();
            completeBtn.remove();

            let delBtn = document.createElement("button");
            delBtn.innerHTML = "DELETE";

            innerDiv.append(delBtn);
            doneColumn.append(card);

            todos[cardObj.id-1].status = "done";

            localStorage.setItem("todos", JSON.stringify(todos));

            delBtn.addEventListener("click", () => {
                card.remove();

                todos.forEach((elem, index) => {
                    if(elem.id == cardObj.id) {
                        todos.splice(index, 1);
                    }
                });

                localStorage.setItem("todos", JSON.stringify(todos));
            });
        });
    });

    deleteBtn.addEventListener("click", () => {
        card.remove();

        todos.forEach((item, index) => {
            if (item.id == cardObj.id) {
                todos.splice(index,1);
            }
        });

        localStorage.setItem("todos", JSON.stringify(todos));
    });
};

doneBtn.addEventListener("click", () => { //кнопка удалить все
    let arr = document.querySelectorAll(".done");
    for(let elem of arr) {
        elem.remove();
    }

    todos = todos.filter((item) => item.status !== "done")

    localStorage.setItem("todos", JSON.stringify(todos));
});

createTodoBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

function openModal() {
    modal.style.display = "block";
    
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(arr => arr.forEach(element => {
            let option = document.createElement("option");
            option.value = element.name;
            option.text = element.name;
            select.appendChild(option);
        }))
};

function closeModal() {
    modal.style.display = "none";
};

function outsideClick(e) {
    if(e.target == modal) {
        modal.style.display = "none";
    }
}

export { todoColumn, progressColumn, doneColumn }

