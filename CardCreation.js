const toDoColumn = document.querySelector(".todocolumn");

createCard(
  "Images/High.png",
  "მაღალი",
  "აიტიი",
  "30 მარტ, 2025",
  "რიკი მაგარია",
  "რიკტირკტირკტირკტრიტკ",
  "Images/coworker.png",
  100
);

//ობიექტებში ჩაკვეხე ყველაფერი
function createCard(
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
