// alert("Test");

document.querySelector("#addListItemBtn").addEventListener("click", function() {
    // alert("Add list item...");
    addListItemDiv.style.display = "none";
    addListItemConfirmation.style.display = "block";
    liInputDiv.style.display = "block";
});



var addListItemDiv = document.querySelector("#addListItemDiv");
var addListItemConfirmation = document.querySelector("#addListItemConfirmation");
var confirmationCancelBtn = document.querySelector("#confirmationCancelBtn").addEventListener("click", function() {
    addListItemDiv.style.display = "block";
    addListItemConfirmation.style.display = "none";
    liInputDiv.style.display = "none";
});

var listItemTextInput = document.querySelector("#listItemTextInput");

var liInputDiv = document.querySelector("#liInputDiv");

var list0 = document.querySelector("#list0");
document.querySelector("#confirmationSuccessBtn").addEventListener("click", function() {
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