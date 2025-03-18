const overlay = document.querySelector(".overlay");

function coworkerDivVisible(isVisible) {
  if (isVisible) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
}
