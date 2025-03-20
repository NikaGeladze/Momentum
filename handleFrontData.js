document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const coworkerDiv = document.querySelector(".coworkercreate");

    if (!coworkerDiv.contains(event.target)) {
      coworkerDivVisible(false);
    }
  });
  document.getElementById("avatarbox").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });

  document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("avatarimg").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  const textareaname = document.getElementById("namein");
  textareaname.addEventListener("change", () => {
    textareaname.style.border = "1px solid #CED4DA";
  });
  const minnametext = document.querySelector(".nmconstraint2");
  const maxnametext = document.querySelector(".nmconstraint255");

  const textareasurname = document.getElementById("surnamein");
  textareasurname.addEventListener("change", () => {
    textareasurname.style.border = "1px solid #CED4DA";
  });
  const avatarbx = document.getElementById("avatarbox");
  avatarbx.addEventListener("change", () => {
    avatarbx.style.border = "2px dotted #ced4daaf";
  });
  const minsurnametxt = document.querySelector(".surconstraint2");
  const maxsurnametxt = document.querySelector(".surconstraint255");

  textareaname.addEventListener("input", function () {
    const textLength = textareaname.value.length;

    if (textareaname.value === "") {
      minnametext.style.color = "#6c757d";
      maxnametext.style.color = "#6c757d";
    }

    if (textLength >= 2) {
      minnametext.style.color = "green";
    } else {
      minnametext.style.color = "#6c757d";
    }

    if (textLength <= 255 && textLength != 0) {
      maxnametext.style.color = "green";
    } else {
      maxnametext.style.color = "#6c757d";
    }

    isValidHeader = textLength > 2 && textLength <= 255;
  });
  textareasurname.addEventListener("input", function () {
    const textLength = textareasurname.value.length;

    if (textareaname.value === "") {
      minsurnametxt.style.color = "#6c757d";
      maxsurnametxt.style.color = "#6c757d";
    }

    if (textLength >= 2) {
      minsurnametxt.style.color = "green";
    } else {
      maxsurnametxt.style.color = "#6c757d";
    }

    if (textLength <= 255 && textLength != 0) {
      maxsurnametxt.style.color = "green";
    } else {
      maxsurnametxt.style.color = "#6c757d";
    }

    //isValidHeader = textLength > 2 && textLength <= 255;
    //console.log("Is valid:", isValidHeader);
  });
});

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
function displayDepartments(departmentsData) {
  const departmentsOptions = document.getElementById("depslct");
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

fetchDepartments();
