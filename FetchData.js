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
    displayDepartments(departmentsData);
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}

function displayPriorities(prioritiesData) {
  const priorityOptions = document.getElementById("priorityoptions");
  const prioImg = document.querySelector(".prioimg");

  prioritiesData.forEach((priority, index) => {
    const option = document.createElement("option");
    option.value = priority.icon;
    option.textContent = priority.name;
    option.setAttribute("data-id", priority.id);

    if (index === 1) {
      option.selected = true;
      prioImg.src = priority.icon;
    }

    priorityOptions.appendChild(option);
  });

  priorityOptions.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const selectedIcon = selectedOption.value;
    const selectedId = selectedOption.getAttribute("data-id");

    prioImg.src = selectedIcon;
  });

  priorityOptions.dispatchEvent(new Event("change"));
}

function displayStatuses(statusesData) {
  const statusOptions = document.getElementById("statusoptions");
  statusesData.forEach((status, index) => {
    const option = document.createElement("option");
    option.value = status.id;
    option.textContent = status.name;

    if (index === 0) {
      option.selected = true;
    }

    statusOptions.appendChild(option);
  });

  statusOptions.dispatchEvent(new Event("change"));
}
function displayDepartments(departmentsData) {
  const departmentsOptions = document.getElementById("departmentoptions");
  departmentsData.forEach((dep, index) => {
    const option = document.createElement("option");
    option.value = dep.id;
    option.textContent = dep.name;

    if (index === 0) {
      option.selected = true;
    }

    departmentsOptions.appendChild(option);
  });

  departmentsOptions.dispatchEvent(new Event("change"));
}

fetchPriorities();
fetchStatuses();
fetchDepartments();
