let count = 0;

window.addEventListener("load", () => {
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  let formattedDate = today.toLocaleDateString(undefined, options);
  document.getElementById("setDate").textContent = formattedDate;
  clearCookies();
  clearCache();
  showTime();
  loadTodos();
});

function clearCookies() {
  document.cookie.split(";").forEach(function (cookie) {
    let name = cookie.split("=")[0].trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
}

function clearCache() {
  if ("caches" in window) {
    caches.keys().then(function (names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
}

// Combine both functions on page load

function loadTodos() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let addData = document.getElementById("todo-list");
    let id = key.split("-")[i];
    let data = `
      <li class="list-group-item p-3">
          <input class="form-check-input ml-1" onclick="checkCheckbox(this)" onData="${id}" id="todo-${id}" type="checkbox" />
          <label class="form-check-label ml-5" id="label-${id}" for="todo-${id}">
              ${value}
          </label>
      </li>`;
    addData.insertAdjacentHTML("beforeend", data);
  }
}

document.getElementById("add_task").addEventListener("click", () => {
  let element = document.querySelector(".clear-task-button");
  if (element) {
    console.log("Element exists!");
    element.remove();
  } else {
    console.log("Element not found.");
  }
  let value = document.getElementById("input_task").value;
  if (value.length == 0) {
    alert("Add Task");
  } else {
    let addData = document.getElementById("todo-list");
    let data = `<li class="list-group-item p-3">
      <input class="form-check-input ml-1" onclick="checkCheckbox(this)" onData="${count}"  id="todo-${count}" type="checkbox" />
      <label class="form-check-label ml-5" id="lable-${count}"  for="todo-${count}">
        ${value}
      </label>
    </li>`;
    localStorage.setItem(`todo-${count}`, value);
    addData.insertAdjacentHTML("beforeend", data);
    count++;
    document.getElementById("input_task").value = "";
    document.getElementById("input_task").focus();
  }
});

function checkCheckbox(checkboxElement) {
  let getID = checkboxElement.id;
  let getmyelement = document.getElementById(getID);
  let getMyAttribute = getmyelement.getAttribute("onData");
  console.log(getMyAttribute);
  if (checkboxElement.checked) {
    console.log("Checkbox is checked!");
    let inLabel = document.getElementById(`lable-${getMyAttribute}`);
    console.log(inLabel);
    inLabel.classList.add("line-through");
    // You can add additional logic here for checked state, like updating UI or data
  } else {
    console.log("Checkbox is unchecked!");
    let inLabel = document.getElementById(`lable-${getMyAttribute}`);
    console.log(inLabel);
    inLabel.classList.remove("line-through");
    // You can add additional logic here for unchecked state
  }
}

document.getElementById("clear_all_button").addEventListener("click", () => {
  let confirmClear  = confirm("Are You Sure You want to Clear All Task . After Clearing the task it cannot be recovered.You need to add a  new task.");
  if (confirmClear  == true) {
    let addData = document.getElementById("todo-list");
    count = 0;
    while (addData.firstChild) {
      addData.removeChild(addData.firstChild);
    }
    let data = `
        <button style="width:200px; font-weight: bold; text-transform: uppercase;" class="m-auto clear-task-button btn btn-warning">
        Nothing to do
      </button>
    `;
    addData.insertAdjacentHTML("beforeend", data);
    localStorage.clear();
  }
});

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  // document.getElementById("MyClockDisplay").textContent = time;
  setTimeout(showTime, 1000);
}
