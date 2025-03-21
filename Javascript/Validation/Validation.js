const textareaname = document.getElementById("headerin");
const minnametext = document.querySelector(".hdconstraint2");
const maxnametext = document.querySelector(".hdconstraint255");

const textareads = document.getElementById("descr");
const constraintMinds = document.querySelector(".descrconstraint2");
const constraintMaxds = document.querySelector(".descrconstraint255");
const coworker = document.getElementById("coworkerslct");
const date = document.getElementById("date");

coworker.addEventListener("change", function () {
  coworker.style.border = "1px solid #DEE2E6";
});

date.addEventListener("change", function () {
  date.style.border = "1px solid #DEE2E6";
  localStorage.setItem("date", date.value);
});

const dateInput = document.getElementById("date");

const today = new Date();

today.setDate(today.getDate() + 1);

const tomorrow = today.toISOString().split("T")[0];

if (localStorage.getItem("date") == null) dateInput.value = tomorrow;
else {
  dateInput.value = localStorage.getItem("date");
}

textareaname.addEventListener("input", function () {
  validateHeader();
  localStorage.setItem("header", textareaname.value);
});

textareads.addEventListener("input", function () {
  validateDescription();
  localStorage.setItem("descr", textareads.value);
});

textareaname.value = localStorage.getItem("header") || "";
textareads.value = localStorage.getItem("descr") || "";
validateDescription();
validateHeader();

function validateDescription() {
  const text = textareads.value.trim();
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const charCount = text.length;

  if (text === "") {
    constraintMinds.style.color = "#6c757d";
    constraintMaxds.style.color = "#6c757d";
    isValidDescr = true;
  } else {
    if (wordCount >= 4) {
      constraintMinds.style.color = "green";
    } else {
      constraintMinds.style.color = "#6c757d";
    }

    if (charCount <= 255) {
      constraintMaxds.style.color = "green";
    } else {
      constraintMaxds.style.color = "#6c757d";
    }
  }
}
function validateHeader() {
  const textLength = textareaname.value.length;

  if (textareaname.value === "") {
    minnametext.style.color = "#6c757d";
    maxnametext.style.color = "#6c757d";
  }

  if (textLength >= 3) {
    minnametext.style.color = "green";
  } else {
    minnametext.style.color = "#6c757d";
  }

  if (textLength <= 255 && textLength != 0) {
    maxnametext.style.color = "green";
  } else {
    maxnametext.style.color = "#6c757d";
  }
}
