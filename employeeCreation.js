function addEmployee() {
  let emp = createEmployee();
  uploadEmployee(emp);
  coworkerDivVisible(false);
}

function createEmployee() {
  const name = document.getElementById("namein").value;
  const surname = document.getElementById("surnamein").value;
  const img = document.getElementById("fileInput").files[0];
  const depid = document.getElementById("depslct").value;

  return {
    name: name,
    surname: surname,
    avatar: img,
    department_id: depid,
  };
}

function uploadEmployee(emp) {
  const formData = new FormData();
  formData.append("name", emp.name);
  formData.append("surname", emp.surname);
  formData.append("avatar", emp.avatar);
  formData.append("department_id", emp["department_id"]);

  const token = "9e788fde-10d9-4ca8-9d09-9ca169c0db4c";

  fetch("https://momentum.redberryinternship.ge/api/employees", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("uupload successful:", data))
    .catch((error) => console.error("upload failed:", error));
}
