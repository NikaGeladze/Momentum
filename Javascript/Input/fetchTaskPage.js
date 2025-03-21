const token = "9e7cb42d-74a4-4063-a267-c9493b4ca9ac";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const cardID = params.get("id");
  const statusOptions = document.getElementById("stselect");
  statusOptions.addEventListener("change", () =>
    updateStatus(cardID, statusOptions.value)
  );
  fetchCardDetails(cardID);
});

function fetchCardDetails(cardID) {
  const apiUrl = `https://momentum.redberryinternship.ge/api/tasks/${cardID}`;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayCard(data);
      fetchStatuses(data.status);
      displayDeadline(data["due_date"]);
    })
    .catch((error) => {
      console.error("Error fetching task details:", error);
    });
}
function displayDeadline(date) {
  const deadlinetxt = document.querySelector(".deadline");

  const deadlineDate = new Date(date);

  const weekdays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
  const weekday = weekdays[deadlineDate.getDay()];

  const formattedDate = deadlineDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  deadlinetxt.textContent = `${weekday} - ${formattedDate}`;
}

function displayCard(card) {
  const prioritydiv = document.querySelector(".prioritydiv");
  const depdiv = document.querySelector(".depdiv");
  const cardHeader = document.querySelector(".cardheader");
  const cardContent = document.querySelector(".cardcontent");

  let priorityimg = document.createElement("img");
  priorityimg.src = card.priority.icon;
  priorityimg.alt = "pimg";
  switch (card.priority.name) {
    case "დაბალი":
      prioritydiv.classList.add("lowpriority");
      prioritydiv.classList.remove("mediumpriority", "highpriority");
      break;
    case "საშუალო":
      prioritydiv.classList.add("mediumpriority");
      prioritydiv.classList.remove("lowpriority", "highpriority");
      break;
    case "მაღალი":
      prioritydiv.classList.add("highpriority");
      prioritydiv.classList.remove("lowpriority", "mediumpriority");
      break;
  }
  prioritydiv.appendChild(priorityimg);
  prioritydiv.appendChild(document.createTextNode(card.priority.name));

  switch (card.department.name) {
    case "ადმინისტრაციის დეპარტამენტი":
      depdiv.classList.add("administrationdep");
      depdiv.textContent = "ადმინისტრ.";
      break;
    case "ადამიანური რესურსების დეპარტამენტი":
      depdiv.classList.add("HRdep");
      depdiv.textContent = "ადამ. რეს.";
      break;
    case "ფინანსების დეპარტამენტი":
      depdiv.classList.add("financesdep");
      depdiv.textContent = "ფინანსები";
      break;
    case "გაყიდვები და მარკეტინგის დეპარტამენტი":
      depdiv.classList.add("marketingdep");
      depdiv.textContent = "მარკეტინგი";
      break;
    case "ლოჯოსტიკის დეპარტამენტი":
      depdiv.classList.add("logisticsdep");
      depdiv.textContent = "ლოჯისტიკა";
      break;
    case "ტექნოლოგიების დეპარტამენტი":
      depdiv.classList.add("ITdep");
      depdiv.textContent = "ინფ. ტექ";
      break;
    case "მედიის დეპარტამენტი":
      depdiv.classList.add("mediadep");
      depdiv.textContent = "მედია";
      break;
    default:
      depdiv.style = "border:0.5px solid green;";
      depdiv.textContent = deptxt;
  }
  cardHeader.textContent = card.name;
  cardContent.textContent = card.description;
  displayEmployee(card.employee, card.department);
}
function displayEmployee(emp, dep) {
  empImg = document.getElementById("coworkerimg");
  depName = document.querySelector(".depname");
  empFullName = document.querySelector(".empname");

  empImg.src = emp.avatar;
  depName.textContent = dep.name;
  if (emp.name.length + emp.surname.length > 40) {
    empFullName.textContent =
      emp.name.substring(0, 20) +
      "..." +
      " " +
      emp.surname.substring(0, 20) +
      "...";
  } else {
    empFullName.textContent = emp.name + " " + emp.surname;
  }
}
function displayStatuses(statusesData, curstatus) {
  const statusOptions = document.getElementById("stselect");
  statusesData.forEach((status, index) => {
    const option = document.createElement("option");
    option.value = status.id;
    option.textContent = status.name;

    if (index + 1 === curstatus) {
      option.selected = true;
    }

    statusOptions.appendChild(option);
  });
}
async function updateStatus(cardID, newStatusID) {
  const apiUrl = `https://momentum.redberryinternship.ge/api/tasks/${cardID}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status_id: newStatusID }),
    });

    const responseData = await response.json();
    console.log("Status updated successfully:", responseData);
  } catch (error) {
    console.error("Error updating status:", error);
  }
}

async function fetchStatuses(curstatus) {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/statuses"
    );

    const statusesData = await response.json();
    displayStatuses(statusesData, curstatus.id);
  } catch (error) {
    console.error("Error fetching statuses:", error);
  }
}
