const toDoColumn = document.querySelector(".todocolumn");

export function createCard(
  primg,
  prtext,
  deptxt,
  deadline,
  header,
  content,
  coworker,
  commentcount
) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("todo"); //shesacvlelia

  let cardheader = document.createElement("div");
  cardheader.classList.add("cardheader");

  let leftpart = document.createElement("div");
  leftpart.classList.add("leftp");

  let prioritydiv = document.createElement("div");
  prioritydiv.classList.add("prioritydiv");

  let priorityimg = document.createElement("img");
  priorityimg.src = primg;
  priorityimg.alt = "pimg";

  prioritydiv.appendChild(priorityimg);
  prioritydiv.appendChild(document.createTextNode(prtext));

  let depdiv = document.createElement("div");
  depdiv.classList.add("depdiv");
  depdiv.textContent = deptxt;

  let datedue = document.createElement("div");
  datedue.classList.add("datedue");
  datedue.textContent = deadline;
  let cardcontent = document.createElement("div");
  cardcontent.classList.add("cardcontent");

  let crheader = document.createElement("div");
  crheader.classList.add("crheader");
  crheader.textContent = header;

  let crcontent = document.createElement("div");
  crcontent.classList.add("crcontent");
  crcontent.textContent = content;
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

  toDoColumn.appendChild(card);
}

export async function uploadTask(task) {
  const token = "9e788fde-10d9-4ca8-9d09-9ca169c0db4c";

  const formData = new URLSearchParams();
  formData.append("name", task.name);
  formData.append("description", task.description);
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
  } catch (error) {
    console.error("Error uploading task:", error);
  }
}
