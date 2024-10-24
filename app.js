const apiUrl = 'https://jsonplaceholder.org/posts';
const tableBody = document.querySelector('#data-table tbody');
const form = document.getElementById('create-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const slug = document.getElementById('slug').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const status = document.getElementById('status').value;
    const category = document.getElementById('category').value;



    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, content, status, category })
    })
    .then(response => response.json())
    .then(data => {
        addRowToTable(data);
    });
});

function getAllData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.slice(0, 20).forEach(item => addRowToTable(item)); 
        });
}

function addRowToTable(item) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', item.id);

    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.slug}</td>
        <td>${item.title}</td>
        <td>${item.content}</td>
        <td>${item.status}</td>
        <td>${item.category}</td>
        
        <td>
            <button onclick="editItem(${item.id})">Изменить</button>
            <button onclick="deleteItem(${item.id})">Удалить</button>
        </td>
    `;

    tableBody.appendChild(row);
}

function editItem(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    const slug = prompt('Введите новый Slug', row.cells[1].innerText);
    const title = prompt('Введите новое Title', row.cells[2].innerText);
    const category = prompt('Введите новое Content', row.cells[3].innerText);
    const content = prompt('Введите новое Status', row.cells[4].innerText);
    const status = prompt('Введите новое Category', row.cells[5].innerText);



    if (slug && title && content && status && category) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, title, content, status, category })
        })
        .then(response => response.json())
        .then(data => {
            row.cells[1].innerText = data.slug;
            row.cells[2].innerText = data.title;
            row.cells[3].innerText = data.content;
            row.cells[4].innerText = data.status;
            row.cells[5].innerText = data.category;


        });
    }
}

// 4. DELETE: Удалить элемент
function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        const row = document.querySelector(`tr[data-id='${id}']`);
        row.remove();
    });
}

getAllData();
