let count = 0;

window.addEventListener("load", () => {
    let today = new Date();
    let options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    let formattedDate = today.toLocaleDateString(undefined, options);
    document.getElementById("setDate").textContent = formattedDate;
 });
 

document.getElementById("add_task").addEventListener("click", () => {
  let element = document.querySelector(".clear-task-button");
  if (element) {
    console.log("Element exists!");
    element.remove();
  } else {
    console.log("Element not found.");
  }
  let value = document.getElementById("input_task").value;
  let addData = document.getElementById("todo-list");
  let data = `<li class="list-group-item p-3">
    <input class="form-check-input ml-1" onclick="checkCheckbox(this)" onData="${count}"  id="todo-${count}" type="checkbox" />
    <label class="form-check-label ml-5" id="lable-${count}"  for="todo-${count}">
      ${value}
    </label>
  </li>`;
  addData.insertAdjacentHTML("beforeend", data);
  count++;
  document.getElementById("input_task").value = "";
  document.getElementById("input_task").focus();
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
  let addData = document.getElementById("todo-list");
  while (addData.firstChild) {
    addData.removeChild(addData.firstChild);
  }
  let data = `
      <button style="width:30%; font-weight: bold; text-transform: uppercase;" class="m-auto clear-task-button btn btn-warning">
      List is Cleared Add tasks to do
    </button>
  `;
  addData.insertAdjacentHTML("beforeend", data);
});
