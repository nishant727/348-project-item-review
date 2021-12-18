// client-side js

//ITEM List Form
const usersForm = document.forms[0];
const titleInput = usersForm.elements["title"];
const descInput = usersForm.elements["description"];
const contactInput = usersForm.elements["contact"];
const categoryInput = usersForm.elements["category"];
const itemList = document.getElementById("item");

//updates the user table on the page
const appendNewItem = item => {
  const newTrItem = document.createElement("tr");
  const titleTdItem = document.createElement("td");
  titleTdItem.innerHTML = item.title;
  const descTdItem = document.createElement("td");
  descTdItem.innerHTML = item.description;
  const categoryTdItem = document.createElement("td");
  categoryTdItem.innerHTML = item.category;
  const contactTdItem = document.createElement("td");
  contactTdItem.innerHTML = item.contact;
  const dateTdItem = document.createElement("td");
  dateTdItem.innerHTML = item.date;
  const idTdItem = document.createElement("td");
  idTdItem.innerHTML = item.id;

  newTrItem.appendChild(idTdItem);
  newTrItem.appendChild(titleTdItem);
  newTrItem.appendChild(descTdItem);
  newTrItem.appendChild(categoryTdItem);
  newTrItem.appendChild(contactTdItem);
  newTrItem.appendChild(dateTdItem);

  const tbItem = document.getElementById("item_table");
  tbItem.appendChild(newTrItem);
};

//add a new user to the list when submitted
usersForm.onsubmit = event => {
  //stop the form submission from refreshing the page
  event.preventDefault();
  const date = new Date().toLocaleDateString();
  const data = {
    title: titleInput.value,
    description: descInput.value,
    contact: contactInput.value,
    //maybe
    category: categoryInput.value,
    date: date
  };

  fetch("/addItem", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });

  fetch("/getItems", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        appendNewItem({
          id: row.id,
          title: row.title,
          description: row.description,
          contact: row.contact,
          //maybe
          category: row.category,
          date: row.datejoined
        });
      });
    });

  //reset form
  titleInput.value = "";
  titleInput.focus();
  descInput.value = "";
  contactInput.value = "";
  categoryInput.value = 0;
};
