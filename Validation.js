const textareahd = document.getElementById("headerin");
const constraintMinhd = document.querySelector(".hdconstraint2");
const constraintMaxhd = document.querySelector(".hdconstraint255");

const textareads = document.getElementById("descr");
const constraintMinds = document.querySelector(".descrconstraint2");
const constraintMaxds = document.querySelector(".descrconstraint255");

let isValidHeader = false;

let isValidDescr = true;

textareahd.addEventListener("input", function () {
  const textLength = textareahd.value.length;

  if (textareahd.value === "") {
    constraintMinhd.style.color = "#6c757d";
    constraintMaxhd.style.color = "#6c757d";
  }

  if (textLength > 2) {
    constraintMinhd.style.color = "green";
  } else {
    constraintMinhd.style.color = "#6c757d";
  }

  if (textLength <= 255 && textLength != 0) {
    constraintMaxhd.style.color = "green";
  } else {
    constraintMaxhd.style.color = "#6c757d";
  }

  isValidHeader = textLength > 2 && textLength <= 255;
  console.log("Is valid:", isValidHeader);
});

textareads.addEventListener("input", function () {
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

    isValidDescr = wordCount >= 4 && charCount <= 255;
  }
});

const btn = document.querySelector(".createbtn");
btn.addEventListener("click", function () {
  console.log(isValidDescr && isValidHeader);
});
