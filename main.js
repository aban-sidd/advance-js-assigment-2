document.getElementById('form').addEventListener('submit',saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    let name = document.getElementById('site-name').value
    let url = document.getElementById('site-url').value
    
        if (!validateForm(name,url)) {
            return false;
        }

    let bookmarkObj = {
        name: name,
        url: url
    }

    console.log(bookmarkObj);


    let storebookmark = localStorage.getItem('bookmark');

    let bookmark = storebookmark ? JSON.parse(storebookmark) : [];

    bookmark.filter(bookmarks => bookmarks == null)

    bookmark.push(bookmarkObj);

    localStorage.setItem('bookmark', JSON.stringify(bookmark));


    //clear form data
    document.getElementById('form').reset()

    
    // refatch bookmark
    fetchBookmark()
}

//delete bookmark
function deleteBookmark(url){
    let bookmark = JSON.parse(localStorage.getItem('bookmark'))
    
    bookmark.filter(bookmark => bookmark.url == url)

    bookmark.splice(bookmark,1)

    localStorage.setItem('bookmark', JSON.stringify(bookmark));

    fetchBookmark()

    
}



// fetch bookmark
    function fetchBookmark() {
        let showBookmark = document.getElementById('Showbookmark')

        let bookmark = JSON.parse(localStorage.getItem('bookmark'))
console.log(bookmark);
        showBookmark.innerHTML = ''

        bookmark.forEach(bookmark => {

            showBookmark.innerHTML += `<div class="bg-secondary-subtle my-2 p-4 rounded-3 ">
                <h3 >${bookmark.name}
                <a class="btn btn-light  " href="${bookmark.url}" target="_blank">Visit Site</a>
                <a class="btn btn-danger " onclick="deleteBookmark('${bookmark.url}')" href="#">Remove</a>
                </h3>
            </div>`
        })
    }


    // validate form

    function validateForm(name , url) {
        if (!name || !url) {
            alert('please fill out the form')
            return false
        }

        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(expression);

        if (!url.match(regex)) {
            alert('please use a valid url')
            return false;
        }


        return true
    }