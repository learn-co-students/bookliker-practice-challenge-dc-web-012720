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
    li.addEventListener("click", renderBook)
    list.append(li)
}

function renderBook(event) {
    let bookId = event.target.dataset.id

    // let div = document.createElement('div')
    // let showPanel = document.getElementById('show-panel')
    // let image = document.createElement('img')
    // let description = document.createElement('p')
    // let title = document.createElement('h2')

    // image.src = book.img_url    
    // description.innerText = book.description
    // title.innerText = book.title

    // div.append(title, image, description)
    // showPanel.append(div)
}