let API = "http://localhost:8000/contactbook";
let list = document.querySelector(".list");
let btn = document.querySelector(".btn");
let inp = document.querySelectorAll("input");
let inp_name = document.querySelector(".inp_name");
let inp_surname = document.querySelector(".inp_surname");
let inp_photo = document.querySelector(".inp_photo");
let inp_number = document.querySelector(".inp_number");
let inp_email = document.querySelector(".inp_email");

let newContactbook = {};

inp_name.addEventListener("input", (e) => {
  newContactbook.name = e.target.value;
});
inp_surname.addEventListener("input", (e) => {
  newContactbook.surname = e.target.value;
});
inp_photo.addEventListener("input", (e) => {
  newContactbook.photo = e.target.value;
});
inp_number.addEventListener("input", (e) => {
  newContactbook.number = e.target.value;
});
inp_email.addEventListener("input", (e) => {
  newContactbook.email = e.target.value;
});

async function addContactbook() {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContactbook),
    });
  } catch (error) {
    console.log(error);
  }
  inp.values = "";
  getContactbook();
}

btn.addEventListener("click", addContactbook);

// read

async function getContactbook() {
  try {
    let res = await fetch(API);
    let contactbook = await res.json();
    render(contactbook);
  } catch (error) {
    console.log(error);
  }
}

// функция отоброжения
function render(contactbook) {
  list.innerHTML = "";
  contactbook.forEach((item) => {
    list.innerHTML += `
  <div class="card">
    <div class="block_img">
        <img class="img_URL" src=${item.photo} />
    </div>
      <div class="block__list-card">
        <h3 class="list__item" >${item.name}</h3>
        <h3 class="list__item" >${item.surname}</h3>
        <li class="list__item" >${item.email}</li>
        <li class="list__item" >${item.number}</li>
        <div class="btnsDeleteEdit">
        <button class="btn-delete" onclick="deleteTodo(${item.id})">Delete</button>
        <button class="btn-edit" onclick="editContactbook(${item.id})">Edit</button>
        </div>
      </div>
  </div>
        `;
  });
}

getContactbook();

// DELETE
async function deleteTodo(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getContactbook();
  } catch (error) {
    console.log(error);
  }
}
// DELETE

// EDIT
let inpName = document.querySelector(".inp-name");
let inpSurname = document.querySelector(".inp-surname");
let inpPhoto = document.querySelector(".inp-photo");
let inpNumber = document.querySelector(".inp-number");
let inpEmail = document.querySelector(".inp-email");
let btnClose = document.querySelector(".btn-close");
let btnSave = document.querySelector(".btn-save");
let modal = document.querySelector(".modal");

let editedContactbook = {};

inpName.addEventListener("input", (e) => {
  editedContactbook.name = e.target.value;
});
inpSurname.addEventListener("input", (e) => {
  editedContactbook.surname = e.target.value;
});
inpPhoto.addEventListener("input", (e) => {
  editedContactbook.photo = e.target.value;
});
inpNumber.addEventListener("input", (e) => {
  editedContactbook.number = e.target.value;
});
inpEmail.addEventListener("input", (e) => {
  editedContactbook.email = e.target.value;
});

async function editContactbook(id) {
  modal.style.display = "block";
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdited = await res.json();

    inpName.value = objToEdited.name;
    inpSurname.value = objToEdited.surname;
    inpPhoto.value = objToEdited.photo;
    inpNumber.value = objToEdited.number;
    inpEmail.value = objToEdited.email;
    btnSave.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}

btnSave.addEventListener("click", async (e) => {
  let id = e.target.id;

  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editedContactbook),
    });
  } catch (error) {
    console.log(error);
  }
  getContactbook();
});

btnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  modal.style.display = "none";
});
// EDIT
