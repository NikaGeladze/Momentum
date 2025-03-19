import { uploadTask } from "./CardCreation.js";

document
  .querySelector(".createbtn")
  .addEventListener("click", () => taskInput());

function taskInput() {
  const header = document.getElementById("headerin").value;
  const descr = document.getElementById("descr").value;
  const priority = parseInt(document.getElementById("priorityoptions").value);
  const status = parseInt(document.getElementById("statusoptions").value);
  const department = parseInt(
    document.getElementById("departmentoptions").value
  );
  const coworker = parseInt(document.getElementById("coworkerslct").value);
  const date_due = document.getElementById("date").value;

  let task = {
    name: header,
    description: descr,
    due_date: date_due,
    status: { id: status },
    priority: { id: priority },
    department: { id: department },
    employee: { id: coworker },
  };
  uploadTask(task);
}
