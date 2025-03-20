import { createCard } from "./CardCreation.js";

document.addEventListener("DOMContentLoaded", () => parseCards());

async function parseCards() {
  const token = "9e790aab-88a7-4478-a1ba-28b942cd8f05";
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/tasks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const cards = await response.json();

    cards.forEach((card) => {
      const primg = card.priority.icon;
      const prtext = card.priority.name;
      const deptxt = card.department.name;
      const deadline = new Date(card.due_date).toISOString().split("T")[0];
      const header = card.name;
      const content = card.description ?? " ";
      const coworker = card.employee.avatar;
      const commentcount = 0;

      createCard(
        card.id,
        primg,
        prtext,
        deptxt,
        deadline,
        header,
        content,
        coworker,
        commentcount,
        card.status.name
      );
    });
  } catch (error) {
    console.error("Error parsing cards:", error);
  }
}
