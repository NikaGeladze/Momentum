function addEmployee() {
  let emp = createEmployee();
  if (validateEmployee(emp)) {
    uploadEmployee(emp);
    coworkerDivVisible(false);
  }
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
function validateEmployee(emp) {
  const nameRegex = /^[\u10A0-\u10FFa-zA-Z]{2,255}$/;
  const textareaname = document.getElementById("namein");
  const minnametext = document.querySelector(".nmconstraint2");
  const maxnametext = document.querySelector(".nmconstraint255");

  const textareasurname = document.getElementById("surnamein");
  const minsurnametxt = document.querySelector(".surconstraint2");
  const maxsurnametxt = document.querySelector(".surconstraint255");
  let isValid = true;

  if (emp.name.length < 2) {
    minnametext.style.color = "red";
    isValid = false;
  } else {
    minnametext.style.color = "black";
  }

  if (emp.name.length > 255) {
    maxnametext.style.color = "red";
    isValid = false;
  }

  if (!emp.name.match(nameRegex)) {
    textareaname.style.borderColor = "red";
    isValid = false;
  }

  if (emp.surname.length < 2) {
    minsurnametxt.style.color = "red";
    isValid = false;
  }

  if (emp.surname.length > 255) {
    maxsurnametxt.style.color = "red";
    isValid = false;
  }

  if (!emp.surname.match(nameRegex)) {
    textareasurname.style.borderColor = "red";
    isValid = false;
  }

  if (!emp.avatar) {
    const avatarbx = document.getElementById("avatarbox");
    avatarbx.style.borderColor = "red";
    return false;
  }

  if (emp.avatar.size > 600 * 1024) {
    alert("სურათი 600kb-ზე მეტია!");
    return false;
  }

  if (!emp.department_id) {
    alert("დეპარტმენტის არჩევა აუცილებელია!");
    return false;
  }

  return isValid;
}

function uploadEmployee(emp) {
  const formData = new FormData();
  formData.append("name", emp.name);
  formData.append("surname", emp.surname);
  formData.append("avatar", emp.avatar);
  formData.append("department_id", emp["department_id"]);

  const token = "9e790aab-88a7-4478-a1ba-28b942cd8f05";

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
