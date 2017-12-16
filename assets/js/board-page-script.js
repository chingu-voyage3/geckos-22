// alert("Test");

document.querySelector("#addListItemBtn").addEventListener("click", function () {
    // alert("Add list item...");
    addListItemDiv.style.display = "none";
    addListItemConfirmation.style.display = "block";
    liInputDiv.style.display = "block";
});

document.querySelector(".lists-row").addEventListener("click", removeListItem);



var addListItemDiv = document.querySelector("#addListItemDiv");
var addListItemConfirmation = document.querySelector("#addListItemConfirmation");
var confirmationCancelBtn = document.querySelector("#confirmationCancelBtn").addEventListener("click", function () {
    addListItemDiv.style.display = "block";
    addListItemConfirmation.style.display = "none";
    liInputDiv.style.display = "none";
});

var listItemTextInput = document.querySelector("#listItemTextInput");

var liInputDiv = document.querySelector("#liInputDiv");

var list0 = document.querySelector("#list0");
document.querySelector("#confirmationSuccessBtn").addEventListener("click", function () {
    let liText = listItemTextInput.value;
    // list0.appendChild(createListItem(liText));
    // Inserts new list item before input field, so div with textarea always spawns at bottom of list
    list0.insertBefore(createListItem(liText), document.querySelector("#liInputDiv"));
    addListItemDiv.style.display = "block";
    addListItemConfirmation.style.display = "none";
    liInputDiv.style.display = "none";
    listItemTextInput.value = "";
});

function createListItem(content) {
    // Creates new list item, ready for inserting into list
    // "content" is desired value of list item

    //     Example list item code
    //     <a class="list-group-item list-group-item-action flex-column align-items-start">
    //     <div class="d-flex">
    //         <p class="mb-1">Lorem Ipsum</p>
    //         <div class="btn-group ml-auto">
    //             <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
    //                         <i class="fa fa-wrench"></i>
    //                     </button>
    //             <div class="dropdown-menu dropdown-menu-right">
    //                 <button class="dropdown-item" type="button">Move</button>
    //                 <button class="dropdown-item" type="button">Copy</button>
    //                 <button class="dropdown-item" type="button">Delete</button>
    //             </div>
    //         </div>
    //     </div>
    // </a>
    let node = document.createElement("a");
    node.className = "list-group-item list-group-item-action flex-column align-items-start";
    node.innerHTML = `
        <div class="d-flex flex-row-reverse w-100 justify-content-between align-items-baseline">
        <button type="button" class="btn btn-outline-secondary btn-sm">
            <i class="fa fa-wrench"></i>
        </button>
        </div>
        <p class="mb-1">${content}</p>
    `;
    return node;
}

function removeListItem(e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains("delete-button")) {
        console.log("delete item");
    }
}




function createList(boardName) {
    // Creates new, empty list and returns it
    let node = document.createElement("div");
    node.className = "col-sm-3"
    node.innerHTML = `
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-9">
                    <p class="font-weight-bold">${boardName}</p>
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-info float-right">Options</button>
                </div>
            </div>
        </div>
        <div class="list-group">
            <a class="list-group-item list-group-item-action flex-column align-items-start new-item-input hidden">
                <form>
                    <div class="form-group">
                        <textarea class="form-control" rows="3" placeholder="Enter content here..." required></textarea>
                    </div>
                </form>
            </a>
        </div>

        <div class="card-footer default-footer">
            <button type="button" class="btn btn-secondary btn-lg btn-block add-item-button">Add new item...</button>
        </div>
        <div class="card-footer confirmation-footer hidden">
            <button type="button" class="btn btn-success confirm-button">Add Item</button>
            <button type="button" class="btn btn-danger cancel-button">Cancel</button>
        </div>
    </div>`;

    return node;
}

function fetchBoard() {
    // Returns board contents, ready for rendering
    // Later could be replaced with API call
    var boardStorage = {
        boardName: "Trello Clone",
        bookmark: true,
        lists: [{
                name: "Resources",
                items: ["Google Drive", "Project Docs", "GitHub Repo"]
            },
            {
                name: "Ideas",
                items: ["PugJS"]
            },
            {
                name: "Backlog",
                items: ["Dashboard - Populate items on page load", "Dashboard - Add actions", "Dashboard - Storage", "Signup Page"]
            }
        ]};
}