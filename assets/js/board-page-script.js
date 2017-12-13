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
    console.log(liText);

    let node = document.createElement("a");
    node.className = "list-group-item list-group-item-action flex-column align-items-start";
    node.innerHTML = `
    <div class="d-flex flex-row-reverse w-100 justify-content-between align-items-baseline">
    <button type="button" class="btn btn-outline-secondary btn-sm">
        <i class="fa fa-wrench"></i>
    </button>
    </div>
    <p class="mb-1">${liText}</p>
    `;
    console.log(node);
    list0.appendChild(node);
    addListItemDiv.style.display = "block";
    addListItemConfirmation.style.display = "none";
    liInputDiv.style.display = "none";
    listItemTextInput.value = "";
});