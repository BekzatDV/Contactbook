let API = "http://localhost:8001/contactbook";
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
      </div>
  </div>
        `;
  });
}

getContactbook();
