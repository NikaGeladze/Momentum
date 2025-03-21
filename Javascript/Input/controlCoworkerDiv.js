const overlay = document.querySelector(".overlay");
function coworkerDivVisible(isVisible) {
  if (isVisible) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
    overlay.querySelectorAll("input, textarea").forEach((input) => {
      input.value = "";

      const eventI = new Event("input", { bubbles: true });
      const eventC = new Event("change", { bubbles: true });
      input.dispatchEvent(eventI);
      input.dispatchEvent(eventC);
    });
    document.getElementById("avatarimg").src = "../../Images/coworker3j.jpeg";
    document.getElementById("depslct").selectedIndex = 0;
    overlay.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0; // Reset dropdowns
    });
  }
}
