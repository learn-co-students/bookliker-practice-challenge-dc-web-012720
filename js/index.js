document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});

function fetchBooks() {
    fetch("http://localhost:3000/books").then(resp => resp.json())
    .then(json => json.forEach(book => makeBookList(book)))
}

function makeBookList(book) {
    let li = document.createElement('li')
    li.dataset.id = book.id
    let list = document.getElementById('list')
    li.innerText = book.title
    li.addEventListener("click", () => renderBook(book) )
    list.append(li)
}

function renderBook(book) {

    console.log(book)
    let bookId = book.id

    console.log(bookId)
    let div = document.createElement('div')
    let showPanel = document.getElementById('show-panel')
    let image = document.createElement('img')
    let description = document.createElement('p')
    let title = document.createElement('h2')
    let ul = document.createElement('ul')
    book.users.forEach( user => ul.append(displayUser(user)) )
    

    image.src = book.img_url    
    description.innerText = book.description
    title.innerText = book.title

    div.append(title, image, description, ul)
    showPanel.innerHTML = ""

    showPanel.append(div)
}

function displayUser(user){
    let li = document.createElement('li')
    li.innerText = user.username
    return li
}