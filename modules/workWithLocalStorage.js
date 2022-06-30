import { todoColumn, progressColumn, doneColumn } from "./cardAddition.js";
import { watch, convertTime } from "./time.js";

function showCardsFromLocalStorage() {
  if (!localStorage.getItem("todos")) {
    return;
  }
  let todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach(elem => {
    let card = document.createElement("div");
    card.classList.add("main__column-card");

    let cardList = document.createElement("ul");
    let firstLi = document.createElement("li");
    let secLi = document.createElement("li");
    let thirdLi = document.createElement("li");
    let innerDiv = document.createElement("div");

    let userSpan = document.createElement("span");
    userSpan.innerHTML = elem.user;

    let userWatch = document.createElement("span");
    userWatch.innerHTML = elem.time;

    let titleSpan = document.createElement("span");
    let descSpan = document.createElement("span");

    titleSpan.innerHTML = elem.title;
    descSpan.innerHTML = elem.desc;

    card.append(cardList);
    firstLi.append(titleSpan, innerDiv);
    secLi.append(descSpan);
    thirdLi.append(userSpan, userWatch);
    cardList.append(firstLi, secLi, thirdLi);

    if (elem.status == "todo") {
        card.classList.add("todo");
    
          let editBtn = document.createElement("button");
          editBtn.innerHTML = "EDIT";
    
          let deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = "DELETE";
    
          let progressBtn = document.createElement("button");
          progressBtn.innerHTML = ">";
    
          innerDiv.append(editBtn, deleteBtn);
          secLi.append(progressBtn);

          todoColumn.append(card);

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
    
            todos[elem.id-1].status = "progress";
    
            localStorage.setItem("todos", JSON.stringify(todos));
    
            backBtn.addEventListener("click", () => {
                card.classList.remove("progress");
                card.classList.add("todo");
    
                backBtn.remove();
                completeBtn.remove();
    
                innerDiv.append(editBtn, deleteBtn);
                secLi.append(progressBtn);
                todoColumn.append(card);
    
                todos[elem.id-1].status = "todo";
    
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
    
                todos[elem.id-1].status = "done";
    
                localStorage.setItem("todos", JSON.stringify(todos));
    
                delBtn.addEventListener("click", () => {
                    card.remove();
    
                    todos.forEach((elem, index) => {
                        if(elem.id == elem.id) {
                            todos.splice(index, 1);
                        }
                    });
    
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
            });
        });
        
        } else if (elem.status == "progress") {
    
          card.classList.add("progress");

          let backBtn = document.createElement("button");
          backBtn.innerHTML = "BACK";
          let completeBtn = document.createElement("button");
          completeBtn.innerHTML = "COMPLETE";

          //чтобы появлялись старые кнопки
          let editBtn = document.createElement("button");
          editBtn.innerHTML = "EDIT";
    
          let deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = "DELETE";

          let progressBtn = document.createElement("button");
          progressBtn.innerHTML = ">";

          innerDiv.append(backBtn, completeBtn);
    
          progressColumn.append(card);
    
            backBtn.addEventListener("click", () => {
                card.classList.remove("progress");
                card.classList.add("todo");
    
                backBtn.remove();
                completeBtn.remove();
    
                innerDiv.append(editBtn, deleteBtn);
                secLi.append(progressBtn);
                todoColumn.append(card);
    
                todos[elem.id-1].status = "todo";
    
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
    
                todos[elem.id-1].status = "done";
    
                localStorage.setItem("todos", JSON.stringify(todos));
    
                delBtn.addEventListener("click", () => {
                    card.remove();
    
                    todos.forEach((elem, index) => {
                        if(elem.id == elem.id) {
                            todos.splice(index, 1);
                        }
                    });
    
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
            });

        } else if (elem.status == "done") {
          card.classList.add("done");

          let delBtn = document.createElement("button");
          delBtn.innerHTML = "DELETE";

          innerDiv.append(delBtn);
    
          doneColumn.append(card);

          delBtn.addEventListener("click", () => {
            card.remove();

            todos.forEach((item, index) => {
                if(item.id == elem.id) {
                    todos.splice(index, 1);
                }
            });

            localStorage.setItem("todos", JSON.stringify(todos));
          });
        }
  })
}

export { showCardsFromLocalStorage };
