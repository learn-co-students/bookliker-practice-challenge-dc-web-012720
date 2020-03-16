document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});


function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(json => json.forEach(book => renderBooks(book)))
}

function renderBooks(event) {
    let div = document.querySelector("#list-panel");
    let ul = document.querySelector("#list");
    let newBook = document.createElement("li");
    newBook.innerText = event.title;
    newBook.classList = event.id;
    newBook.addEventListener("click", () => {
        showBook(event);
    });
    ul.append(newBook);
    div.append(ul);
}

function showBook(event) {
    let div = document.querySelector("#show-panel");
    div.innerText = ""
    let h1 = document.createElement("h1");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let h5 = document.createElement("div");
    let btn =  document.createElement("button")
    h1.innerText = event.title;
    img.src = event.img_url;
    p.innerText = event.description;
    btn.innerText = "read book";
    btn.addEventListener("click", () => {
        addUser(event);
    })
    h5.appendChild(getUsers(event.users));
    div.append(h1, img, p,h5, btn);
}

function getUsers(userList) {
    if (userList.length === 0) {
        return "";
    } else {
        let div = document.createElement("div");
        div.classList = "users";
        userList.forEach(user => {
            let h5 = document.createElement("h5");
            h5.innerText = user.username;
            div.appendChild(h5);
        })
        return div;
    }
}

function addUser(book) {
    let showBook = document.querySelector("#show-panel");
    let h1 = document.querySelector("h1");
    let img = document.querySelector("img");
    let p = document.querySelector("p");
    let h5 = document.querySelector("h5");
    let newUser = {id: 1, username: "pouros"};
    book.users.push(newUser);
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH", 
        body: JSON.stringify({
            title: book.title,
            description: book.description, 
            img_url: book.img_url,
            users: book.users
        }), 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
    .then(json => console.log(json))
    let removeBtn = document.createElement("button");
    removeBtn.innerText = "remove user"
    removeBtn.addEventListener("click", () => {
        removeUser(book);
    })
    h5.innerText = ""
    showBook.innerText =""
    h5.appendChild(getUsers(book.users));
    showBook.append(h1, img, p, h5, removeBtn);
}

function removeUser(book) {
    book.users.pop();
    let showBook = document.querySelector("#show-panel");
    let h1 = document.querySelector("h1");
    let img = document.querySelector("img");
    let p = document.querySelector("p");
    let h5 = document.querySelector("h5");
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH", 
        body: JSON.stringify({
            title: book.title,
            description: book.description, 
            img_url: book.img_url,
            users: book.users
        }), 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
    .then(json => console.log("popwas called"))
    h5.innerText = "";
    showBook.innerText = ""
    h5.appendChild(getUsers(book.users));
    showBook.append(h1, img, p, h5);
}