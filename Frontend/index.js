let currentId = null;
let todosData = [];

function validateForm() {
    let isValid = true;
    let firstErrorField = null;

    const taskEl = document.getElementById("task");
    const task = taskEl.value.trim();

    const tagsE1 = document.getElementById("tags");
    const tags = tagsE1.value.trim();

    const statusEl = document.getElementById("status");
    const status = statusEl.value.trim();
    
    const taskError = document.getElementById("taskError");
    taskError.style.display = "none";
    taskError.innerText = "";

    const tagsError = document.getElementById("tagsError");
    tagsError.style.display = "none";
    tagsError.innerText = "";

    const statusError = document.getElementById("statusError");
    statusError.style.display = "none";
    statusError.innerText = "";
   
    if (task === "") {
        taskError.innerText = "⚠ project-name is required";
        taskError.style.display = "block";
        taskEl.classList.add("input-error");
        if (!firstErrorField) firstErrorField = taskEl;
         isValid = false;
    } else {
        taskError.style.display = "none";
        taskEl.classList.remove("input-error");
    }

    if (tags === "") {
        tagsError.innerText = "⚠ techstack is required";
        tagsError.style.display = "block";
        tagsE1.classList.add("input-error");
         if (!firstErrorField) firstErrorField = tagsEl;
         isValid = false;
    } else {
        tagsError.style.display = "none";
        tagsE1.classList.remove("input-error");
    }

    if (status === "") {
        statusError.innerText = "⚠ status is required";
        statusError.style.display = "block";
        statusEl.classList.add("input-error");
         if (!firstErrorField) firstErrorField = statusE1;
         isValid = false;
    } else{
        statusError.style.display = "none";
        statusEl.classList.remove("input-error");
    }

    if (firstErrorField) firstErrorField.focus();
    return isValid;
}

async function gettodos(){
    try {
        const res = await fetch("https://task-trek-o4v0.onrender.com/todo")
        const data = await res.json()
        todosData = data
        const list = document.getElementById("todolist")
        list.innerHTML = "";
        data.forEach(todo => {
            const li = document.createElement("li")
            li.innerHTML += `${todo.task},${todo.tags},${todo.status} 
            <div class="actions">
                    <button class="editbtn" onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen-to-square"></i></button> 
                     <button id="deletebtn" onclick="deleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
                     </div>
                    `
            list.appendChild(li)
        });
    }
    catch (err) {
    }
}
gettodos();

async function addtodo() {
    if (!validateForm()) return;
    const task = document.getElementById("task").value;
    const tagsInput = document.getElementById("tags").value;
    const status = document.getElementById("status").value;
    const tags = tagsInput.split(",").map(tag => tag.trim())

    try {
        const res = await fetch("https://task-trek-o4v0.onrender.com/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task,
                tags,
                status
            })

        })
        const data = await res.json()
        gettodos()
    }
    catch (err) {
        
    }
    document.getElementById("task").value = "";
    document.getElementById("tags").value = "";
    document.getElementById("status").value = "";
}

function editTodo(id) {
    currentId = id;
    const todo = todosData.find(t => t.id === id);
    document.getElementById("task").value = todo.task;
    document.getElementById("tags").value = todo.tags.join(",");
    document.getElementById("status").value = todo.status;

    document.getElementById("addtodobtn").disabled = true;
    document.getElementById("updatebtn").disabled = false;
}

async function updatetodo() {
    if (!validateForm()) return;
    const task = document.getElementById("task").value;
    const tagsInput = document.getElementById("tags").value;
    const status = document.getElementById("status").value;

    const tags = tagsInput.split(",").map(tag => tag.trim())

    try {
        const res = await fetch(`https://task-trek-o4v0.onrender.com/todo/${currentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task,
                tags,
                status
            })

        })
        const data = await res.json()
        currentId = null;
        document.getElementById("updatebtn").disabled = true
        document.getElementById("task").value = "";
        document.getElementById("tags").value = "";
        document.getElementById("status").value = "";
        gettodos()

        document.getElementById("addtodobtn").disabled = false;
        document.getElementById("updatebtn").disabled = true;

    }
    catch (err) {
    }

}

async function deleteTodo(id) {
    try {
        const res = await fetch(`https://task-trek-o4v0.onrender.com/todo/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await res.json()

        currentId = null;
        gettodos()
    }
    catch (err) {
    }
}