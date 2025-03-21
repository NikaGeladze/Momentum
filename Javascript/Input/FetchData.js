async function fetchPriorities() {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const prioritiesData = await response.json();

    displayPriorities(prioritiesData);
  } catch (error) {
    console.error("Error fetching priorities:", error);
  }
}

async function fetchStatuses() {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/statuses"
    );

    const statusesData = await response.json();
    displayStatuses(statusesData);
  } catch (error) {
    console.error("Error fetching statuses:", error);
  }
}

async function fetchDepartments() {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const departmentsData = await response.json();
    displayTaskDepartments(departmentsData);
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}

async function fetchEmployees(dep_id) {
  try {
    const token = "9e7cb42d-74a4-4063-a267-c9493b4ca9ac";
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const employees = await response.json();

    const filteredEmployees = employees.filter(
      (emp) => emp.department.id == dep_id
    );
    if (filteredEmployees.length > 0) displayEmployees(filteredEmployees);
    else {
      eraseFrontEmployees(document.getElementById("coworkerslct"));
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

function displayPriorities(prioritiesData) {
  const priorityOptions = document.getElementById("priorityoptions");
  const prioImg = document.querySelector(".prioimg");
  let prevPrioID = localStorage.getItem("prio") || null;

  prioritiesData.forEach((priority, index) => {
    const option = document.createElement("option");
    option.value = priority.id;
    option.textContent = priority.name;
    option.setAttribute("img", priority.icon);

    if (index === 1 && prevPrioID == null) {
      option.selected = true;
    } else if (priority.id === parseInt(prevPrioID)) option.selected = true;
    priorityOptions.appendChild(option);
  });

  priorityOptions.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const selectedIcon = selectedOption.getAttribute("img");
    const selectedId = selectedOption.value;

    prioImg.src = selectedIcon;
  });

  priorityOptions.dispatchEvent(new Event("change"));

  priorityOptions.addEventListener("change", () => {
    localStorage.setItem("prio", priorityOptions.value);
  });
}

function displayStatuses(statusesData) {
  const statusOptions = document.getElementById("statusoptions");
  let prevStatID = localStorage.getItem("status") || null;
  statusesData.forEach((status, index) => {
    const option = document.createElement("option");
    option.value = status.id;
    option.textContent = status.name;

    if (index === 0 && prevStatID == null) {
      option.selected = true;
    } else if (status.id === parseInt(prevStatID)) option.selected = true;

    statusOptions.appendChild(option);
  });
  statusOptions.dispatchEvent(new Event("change"));

  statusOptions.addEventListener("change", () => {
    localStorage.setItem("status", statusOptions.value);
  });
}
function displayTaskDepartments(departmentsData) {
  const departmentsOptions = document.getElementById("departmentoptions");
  let prevDepID = localStorage.getItem("dep") || null;
  departmentsData.forEach((dep, index) => {
    const option = document.createElement("option");
    option.value = dep.id;
    option.textContent = dep.name;

    if (index === 0 && prevDepID == null) {
      option.selected = true;
    } else if (dep.id === parseInt(prevDepID)) option.selected = true;

    departmentsOptions.appendChild(option);
  });

  departmentsOptions.addEventListener("change", function () {
    localStorage.setItem("dep", departmentsOptions.value);
    fetchEmployees(departmentsOptions.value);
  });

  departmentsOptions.dispatchEvent(new Event("change"));
}
function displayEmployees(employeeData) {
  const employeeOptions = document.getElementById("coworkerslct");
  eraseFrontEmployees(employeeOptions);
  const employeeImg = document.querySelector(".coworkerimg");
  let prevEmpID = localStorage.getItem("emp") || null;

  employeeData.forEach((emp, index) => {
    const option = document.createElement("option");
    option.value = emp.id;
    option.textContent = emp.name + " " + emp.surname;
    option.setAttribute("img", emp.avatar);

    if (index === 0 && prevEmpID == null) {
      option.selected = true;
      employeeImg.src = option.icon;
    } else if (emp.id === parseInt(prevEmpID)) {
      option.selected = true;
      employeeImg.src = option.icon;
    }

    employeeOptions.appendChild(option);
  });

  employeeOptions.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const selectedIcon = selectedOption.getAttribute("img");
    const selectedId = selectedOption.value;
    localStorage.setItem("emp", employeeOptions.value);
    employeeImg.src = selectedIcon;
  });
  employeeImg.style.display = "inline";
  employeeOptions.dispatchEvent(new Event("change"));
}
function eraseFrontEmployees(employeeOptions) {
  employeeOptions.innerHTML = "";
  const employeeImg = document.querySelector(".coworkerimg");
  employeeImg.style.display = "none";
}

fetchPriorities();
fetchStatuses();
fetchDepartments();
