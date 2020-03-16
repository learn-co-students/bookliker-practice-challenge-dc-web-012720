document.addEventListener("DOMContentLoaded", function() {getAllBooks()});

function getAllBooks() {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(resp => displayBooks(resp))
}

function displayBooks(resp) {
    resp.forEach(book => renderBook(book))
}

function renderBook(book) {
    let bookList = document.getElementById('list')
    let newBook = document.createElement('li')
        newBook.dataset.id = book.id
        newBook.innerText = book.title
        newBook.addEventListener("click", showBookPage)
    bookList.appendChild(newBook)

}

function showBookPage(event){
        fetch(`http://localhost:3000/books/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(book => {
            let bookPanel = document.getElementById('show-panel')
                bookPanel.innerText = ''
                bookPanel.dataset.id = event.target.dataset.id
            let bookTitle = document.createElement('h1')
                bookTitle.innerText = book.title
            let bookImage = document.createElement('img')
                bookImage.src = book.img_url
            let bookDescription = document.createElement('p')
                bookDescription.innerText = book.description
            let bookUsers = document.createElement('ul')
                bookUsers.id = 'booklist'
                book.users.forEach(user => {
                    let bookUser = document.createElement('li')
                        bookUser.innerText = user.username
                    bookUsers.appendChild(bookUser)
                })
            let bookButton = document.createElement('button')
                bookButton.addEventListener("click", addUserLike)
                bookButton.innerText = "Read Book"
            bookPanel.append(bookTitle, bookImage, bookDescription, bookUsers, bookButton)
        })
}

function addUserLike(event) {
    fetch(`http://localhost:3000/books/${event.target.parentElement.dataset.id}`)
    .then(resp => resp.json())
    .then(book => {
        if(book.users.find(user => user.id == 1)) {
            let testUser = book.users.filter(user => user.id != 1)
            let payload = {
                users: testUser
            }
            fetch(`http://localhost:3000/books/${event.target.parentElement.dataset.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(resp => resp.json())
            .then(book => updateUsers(book))
    }
        else {
            let payload = {
                users: [
                    ...book.users, {
                        id: 1,
                        username: 'pouros'
                    }
                ]

            }
            fetch(`http://localhost:3000/books/${event.target.parentElement.dataset.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(resp => resp.json())
                .then(user => appendUser(user))
        }
    }) 
}

function appendUser(user) {
    let userList = document.getElementById('booklist')
    let newUser = document.createElement('li')
        newUser.innerText = 'pouros'
    userList.appendChild(newUser)
}

function updateUsers(book) {
    let userList = document.getElementById('booklist')
        userList.innerText = ''
    book.users.forEach(user => {
        let newUser = document.createElement('li')
            newUser.innerText = user.username
        userList.appendChild(newUser)
    })
}