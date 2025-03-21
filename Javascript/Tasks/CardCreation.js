const toDoColumn = document.querySelector(".todocolumn");
const inprogressColumn = document.querySelector(".inprogresscolumn");
const testingColumn = document.querySelector(".testingcolumn");
const doneColumn = document.querySelector(".donecolumn");

export function createCard(
  id,
  primg,
  prtext,
  deptxt,
  deadline,
  header,
  content,
  coworker,
  commentcount,
  status
) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = id;

  let cardheader = document.createElement("div");
  cardheader.classList.add("cardheader");

  let leftpart = document.createElement("div");
  leftpart.classList.add("leftp");

  let prioritydiv = document.createElement("div");
  prioritydiv.classList.add("prioritydiv");

  switch (prtext) {
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

  let priorityimg = document.createElement("img");
  priorityimg.src = primg;
  priorityimg.alt = "pimg";

  prioritydiv.appendChild(priorityimg);
  prioritydiv.appendChild(document.createTextNode(prtext));

  let depdiv = document.createElement("div");
  depdiv.classList.add("depdiv");
  switch (deptxt) {
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

  let datedue = document.createElement("div");
  datedue.classList.add("datedue");
  datedue.textContent = formatGeorgianDate(deadline);

  let cardcontent = document.createElement("div");
  cardcontent.classList.add("cardcontent");

  let crheader = document.createElement("div");
  crheader.classList.add("crheader");
  if (header.length > 35) {
    crheader.textContent = header.substring(0, 35) + "...";
  } else {
    crheader.textContent = header;
  }

  let crcontent = document.createElement("div");
  crcontent.classList.add("crcontent");

  if (content.length > 100) {
    crcontent.textContent = content.substring(0, 100) + "...";
  } else {
    crcontent.textContent = content;
  }
  let cardfooter = document.createElement("div");
  cardfooter.classList.add("cardfooter");

  let coworkerimg = document.createElement("img");
  coworkerimg.src = coworker;
  coworkerimg.style =
    "width:31px;height:31px;border-radius:50%;object-fit:cover;";

  let commentsdiv = document.createElement("div");
  commentsdiv.classList.add("comments");

  let commentsimg = document.createElement("img");
  commentsimg.src = "Images/Comments.png";
  commentsimg.width = 22;
  commentsimg.height = 22;

  let commentscount = document.createElement("div");
  commentscount.classList.add("commentcount");
  commentscount.textContent = commentcount;

  leftpart.appendChild(prioritydiv);
  leftpart.appendChild(depdiv);
  cardheader.appendChild(leftpart);
  cardheader.appendChild(datedue);

  cardcontent.appendChild(crheader);
  cardcontent.appendChild(crcontent);

  cardfooter.appendChild(coworkerimg);
  commentsdiv.appendChild(commentsimg);
  commentsdiv.appendChild(commentscount);

  cardfooter.appendChild(commentsdiv);

  card.appendChild(cardheader);
  card.appendChild(cardcontent);
  card.appendChild(cardfooter);

  switch (status) {
    case "დასაწყები":
      card.classList.add("todo");
      toDoColumn.appendChild(card);
      break;
    case "პროგრესში":
      card.classList.add("inprogress");
      inprogressColumn.appendChild(card);
      break;
    case "მზად ტესტირებისთვის":
      card.classList.add("testing");
      testingColumn.appendChild(card);
      break;
    case "დასრულებული":
      card.classList.add("donecard");
      doneColumn.appendChild(card);
      break;
  }
  card.addEventListener("click", () => {
    const cardID = card.id;
    window.location.href = `../../Momentum/TaskPage.html?id=${cardID}`;
  });
}

function formatGeorgianDate(isoString) {
  const georgianMonths = [
    "იანვ",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექტ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];

  let dateObj = new Date(isoString);
  let day = dateObj.getDate();
  let month = georgianMonths[dateObj.getMonth()];
  let year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
}

export async function uploadTask(task) {
  if (isValidTask(task)) {
    const token = "9e7cb42d-74a4-4063-a267-c9493b4ca9ac";

    const formData = new URLSearchParams();
    formData.append("name", task.name);
    formData.append("description", task.description ?? "");
    formData.append("due_date", task.due_date);
    formData.append("status_id", task.status.id);
    formData.append("priority_id", task.priority.id);
    formData.append("department_id", task.department.id);
    formData.append("employee_id", task.employee.id);

    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Task uploaded successfully:", data);
      localStorage.clear();
      window.location.href = "index.html";
    } catch (error) {
      console.log("Error uploading task:", error);
    }
  }
}

function isValidTask(task) {
  let isValid = true;

  let today = new Date().toISOString().split("T")[0];

  const minNameText = document.querySelector(".hdconstraint2");
  const maxNameText = document.querySelector(".hdconstraint255");
  const minDescText = document.querySelector(".descrconstraint2");
  const maxDescText = document.querySelector(".descrconstraint255");
  const dueDateField = document.getElementById("date");
  console.log(task.name.length);
  if (!task.name || task.name.length < 3) {
    minNameText.style.color = "red";
    isValid = false;
  }
  if (task.name.length > 255) {
    maxNameText.style.color = "red";
    isValid = false;
  }

  if (task.description != "") {
    let wordCount = task.description.trim().split(/\s+/).length;
    if (wordCount < 4) {
      minDescText.style.color = "red";
      isValid = false;
    }
    if (task.description.length > 255) {
      maxDescText.style.color = "red";
      isValid = false;
    }
  }

  if (
    !task.status?.id ||
    !task.priority?.id ||
    !task.department?.id ||
    !task.employee?.id
  ) {
    if (!task.employee?.id) {
      console.log(task.employee.id);
      document.getElementById("coworkerslct").style =
        "border:1px solid #FA4D4D";
      isValid = false;
    } else {
      alert("პრიორიტეტის,სტატუსის და დეპარტმენტის არჩევა აუცილებელია.");
      isValid = false;
    }
  }
  if (task["due_date"] && task["due_date"] < today) {
    if (dueDateField) dueDateField.style.border = "1px solid red";
    console.alert("დედლაინი წარსულში არ უნდა იყოს!");
    isValid = false;
  }

  return isValid;
}
