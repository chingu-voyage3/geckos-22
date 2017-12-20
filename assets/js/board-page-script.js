var app = new function(){

}

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




function createList(listName, listId) {
    // Creates new, empty list with set name and id
    // listId should be numeric value
    let node = document.createElement("div");
    node.className = "col-sm-3"
    node.innerHTML = `
    <div class="card" id="list-${listId}">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-9">
                    <p class="font-weight-bold">${listName}</p>
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
        ]
    };

    return boardStorage;
}

function displayBoard() {
    // Displays current Board
    boardData = fetchBoard();
    console.log(boardData);
    displayBoardName(boardData.boardName);
    let listsRow = document.querySelector("#lists-row");

    // For each list
    for (let index = 0; index < boardData.lists.length; index++) {
        const list = boardData.lists[index];
        // Create new empty list node, set name and ID
        let listNode = createList(list.name, index);
        // Create individual list items and insert them into list node
        // For each list item
        for (let index = 0; index < list.items.length; index++) {
            const listItem = list.items[index];
            // Create new list item element/node
            let listItemNode = createListItem(listItem);
            // Insert newly created list item node into list node at appropriate position(into div with class .list-group, but before div with class .default-footer. This way input for new list item always stays at bottom of list)
            let listGroupDiv = listNode.querySelector(".list-group");
            listGroupDiv.insertBefore(listItemNode, listGroupDiv.querySelector(".new-item-input")); 
        }
        console.log(listNode);
        // Finally insert created node into board
        listsRow.appendChild(listNode);
        
    }
}

displayBoard();

function displayBoardName(name){
    // Changes displayed board name from placeholder
    let boardName = document.getElementById("board-name");
    boardName.innerHTML = name;
}
