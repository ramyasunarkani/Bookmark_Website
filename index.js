const API_BASE_URL = "https://crudcrud.com/api/12825fc8d3394388ae8a5d9603ad4e01/bookmarks";

function fetchBookmarks() {
    axios.get(`${API_BASE_URL}`)
        .then(response => {
            const bookmarks = response.data;

            const ul = document.querySelector("#show ul");
            ul.innerHTML = ''; 

            bookmarks.forEach(bookmark => addBookmarkToList(bookmark));
        })
        .catch(error => console.error("Error fetching bookmarks:", error));
}

window.onload = fetchBookmarks;

function addBookmarkToList(bookmarkData) {
    const ul = document.querySelector("#show ul");
    const li = document.createElement("li");
    li.id = bookmarkData._id;

    // Text content
    const bookmarkInfo = document.createElement('span');
    bookmarkInfo.innerHTML = `${bookmarkData.title} > <a href="${bookmarkData.url}" target="_blank" style="text-decoration: none;">${bookmarkData.url}</a>`;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteBookmark(bookmarkData._id);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = "edit";
    editBtn.onclick = () => editBookmark(bookmarkData);

    li.appendChild(bookmarkInfo);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
}

function deleteBookmark(bookmarkId) {
    axios.delete(`${API_BASE_URL}/${bookmarkId}`)
        .then(() => {
            document.getElementById(bookmarkId)?.remove();
        })
        .catch(error => console.error("Error deleting bookmark:", error));
}

function editBookmark(bookmarkData) {
    document.getElementById('title').value = bookmarkData.title;
    document.getElementById('url').value = bookmarkData.url;

    deleteBookmark(bookmarkData._id); // Optionally remove this if keeping old data until re-submission
}

function handleOnSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    const bookmarkData = { title, url };

    axios.post(API_BASE_URL, bookmarkData)
        .then(response => {
            addBookmarkToList(response.data);
            document.getElementById('title').value = "";
            document.getElementById('url').value = "";
        })
        .catch(error => console.error("Error adding bookmark:", error));
}
