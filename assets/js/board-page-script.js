var app = new function () {
    this.displayAll = function () {
        // Displays current Board
        // Fetches board contents
        // to-do: add check if board object is empty and display some kind of error
        this.fetchBoard();
        // Displays board name to user
        this.displayBoardName(this.board.boardName);

        // For each list in board object
        for (let index = 0; index < this.board.lists.length; index++) {
            const list = this.board.lists[index];
            // Create new empty list node, set name and ID
            let listNode = this.createList(list.name, index);
            // Create individual list items and insert them into list node
            // For each list item
            for (let index = 0; index < list.items.length; index++) {
                const listItem = list.items[index];
                // Create new list item element/node
                let listItemNode = this.createListItem(listItem);
                // Insert newly created list item node into list node at appropriate position(into div with class .list-group, but before div with class .default-footer. This way input for new list item always stays at bottom of list)
                let listGroupDiv = listNode.querySelector(".list-group");
                listGroupDiv.insertBefore(listItemNode, listGroupDiv.querySelector(".new-item-input"));
            }
            // Finally insert created node into board
            listsRow.appendChild(listNode);
        }

    }

    // Board contents are currently stored in object
    this.board = {};

    this.createListItem = function (content) {
        // Creates new list item, ready for inserting into list
        // "content" is desired value of list item

        // Example list item
        // <a class="list-group-item list-group-item-action flex-column align-items-start">
        // <div class="d-flex">
        //     <p class="mb-1">Lorem Ipsum</p>
        //     <div class="btn-group ml-auto">
        //         <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
        //             <i class="fa fa-wrench"></i>
        //         </button>
        //     </div>
        //     <div class="dropdown-menu dropdown-menu-right">
        //         <button class="dropdown-item move-item-button" type="button">Move</button>
        //         <button class="dropdown-item copy-item-button" type="button">Copy</button>
        //         <button class="dropdown-item delete-item-button" type="button">Delete</button>
        //     </div>
        // </div>
        // </a>
        let node = document.createElement("a");
        node.className = "list-group-item list-group-item-action flex-column align-items-start";
        node.innerHTML = `<div class="d-flex">
            <p class="mb-1">${content}</p>
            <div class="btn-group ml-auto">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i>
                </button>            
                <div class="dropdown-menu dropdown-menu-right">
                    <button class="dropdown-item move-item-button" type="button">Move</button>
                    <button class="dropdown-item copy-item-button" type="button">Copy</button>
                    <button class="dropdown-item delete-item-button" type="button">Delete</button>
                </div>
            </div>
        `;
        return node;
    }

    this.createList = function (listName, listId) {
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
                            <textarea class="form-control new-item-textarea" rows="3" placeholder="Enter content here..." required></textarea>
                        </div>
                    </form>
                </a>
            </div>

            <div class="card-footer default-footer">
                <button type="button" class="btn btn-secondary btn-lg btn-block add-item-button" id="add-item-button-${listId}">Add new item...</button>
            </div>
            <div class="card-footer confirmation-footer hidden">
                <button type="button" class="btn btn-success confirm-button">Add Item</button>
                <button type="button" class="btn btn-danger cancel-button">Cancel</button>
            </div>
        </div>`;

        return node;
    }

    this.fetchBoard = function () {
        // Populates board contents, ready for rendering
        // Later could be replaced with API call
        this.board = {
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
    }

    this.displayBoardName = function (name) {
        // Changes displayed board name from placeholder
        let boardName = document.getElementById("board-name");
        boardName.innerHTML = name;
    }

    this.edit = function (e) {        
        // Check is "Add new item..." button pressed
        if (e.target.classList.contains("add-item-button")) {            
            // Select parent card and necessary elements
            let card = e.target.closest(".card");
            let defaultFooter = card.querySelector(".default-footer");
            let newItemInput = card.querySelector(".new-item-input");
            let confirmationFooter = card.querySelector(".confirmation-footer");

            // Show confirmation footer, text input list item and hide original add new item button
            app.hideElement(defaultFooter);
            app.showElement(newItemInput);
            app.showElement(confirmationFooter);
            // Add click event listener to confirmation button
            card.querySelector("button.confirm-button").addEventListener("click", function(){
                console.log("Confirm button pressed");
                // Take value from text input and stores it in variable
                let input = newItemInput.querySelector(".new-item-textarea").value.trim();
                if(!!input){
                    console.log(input);
                }
                // console.log(input);

            });

            // Add click event listener to cancel button
            card.querySelector("button.cancel-button").addEventListener("click", function(){
                // Return list to default view
                app.showElement(defaultFooter);
                app.hideElement(newItemInput);
                app.hideElement(confirmationFooter);

            });



        }
    }

    this.hideElement = function(e){
        e.style.display = "none";
    }

    this.showElement = function(e){
        e.style.display = "block";
    }

    // Listening for event
    // Div in which lists need to be inserted
    let listsRow = document.querySelector("#lists-row");
    listsRow.addEventListener("click", this.edit);



}


// function removeListItem(e) {
//     // console.log(e.target.classList);
//     if (e.target.classList.contains("delete-button")) {
//         console.log("delete item");
//     }
// }

app.displayAll();