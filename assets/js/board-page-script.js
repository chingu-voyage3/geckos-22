var app = new function () {
    this.startup = function () {
        // Displays board at startup
        // Board is fetched only on startup, on update it's fetched from browser memory

        // Fetches board contents
        // to-do: add check if board object is empty and display some kind of error
        this.fetchBoard();

        // Displays board name to user
        this.displayBoardName(this.board.boardName);

        // Update board
        this.updateBoard();

    }

    this.updateBoard = function () {
        // Updates displayed board

        //Clears display
        listsRow.innerHTML = "";

        // For each list in board object
        for (let listIndex = 0; listIndex < this.board.lists.length; listIndex++) {
            const list = this.board.lists[listIndex];
            // Create new empty list node, set name and ID
            let listNode = this.createList(list.name, listIndex);
            // Create individual list items and insert them into list node
            // For each list item
            for (let itemIndex = 0; itemIndex < list.items.length; itemIndex++) {
                const listItem = list.items[itemIndex];
                const listItemId = listIndex + "-" + itemIndex;
                // Create new list item element/node
                let listItemNode = this.createListItem(listItem, listItemId);
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

    this.createListItem = function (content, id) {
        // Creates new list item, ready for inserting into list
        // "content" is desired value of list item

        // Example list item
        // <a class="list-group-item list-group-item-action flex-column align-items-start" id="listIndex-listItemIndex">
        // <div class="d-flex">
        //     <p class="mb-1">Lorem Ipsum</p>
        //     <div class="btn-group ml-auto">
        //         <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
        //             <i class="fa fa-wrench"></i>
        //         </button>
        //     </div>
        //     <div class="dropdown-menu dropdown-menu-right text-center">
        //         <button class="dropdown-item move-item-button" type="button">Move</button>
        //         <button class="dropdown-item copy-item-button" type="button">Copy</button>
        //         <button class="dropdown-item delete-item-button" type="button">Delete</button>
        //     </div>
        // </div>
        // </a>
        let node = document.createElement("a");
        node.className = "list-group-item list-group-item-action flex-column align-items-start";
        node.id = id;
        node.innerHTML = `<div class="d-flex">
            <p class="mb-1">${content}</p>
            <div class="btn-group ml-auto">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-wrench"></i>
                </button>            
                <div class="dropdown-menu dropdown-menu-right text-center">
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
                <div class="float-left">
                    <p class="font-weight-bold">${listName}</p>
                </div>
                <div class="float-right">
                    <div class="dropdown d-inline-block">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">Options</button>
                        <div class="dropdown-menu dropdown-menu-right text-center">
                            <button class="dropdown-item add-item-button" type="button">Add new item</button>
                            <button class="dropdown-item move-list-button" type="button">Move list</button>
                            <button class="dropdown-item copy-list-button" type="button">Copy list</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item delete-list-button" type="button">Delete list</button>
                        </div>
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
        // Check if "Add new item..." button was pressed
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
            card.querySelector("button.confirm-button").addEventListener("click", function () {
                console.log("Confirm button pressed");
                // Take value from text input and stores it in variable
                let input = newItemInput.querySelector(".new-item-textarea").value.trim();
                // Input validation, if input is empty or null execution doesn't continue
                if (!!input) {
                    console.log(input);
                    // Find card index, card has id in format "list-xx", so index can be retrieved by reading string from position 5 until end
                    const cardIndex = card.id.substr(5);
                    // Push item to end of array                    
                    app.board.lists[cardIndex].items.push(input);
                    // Clear input
                    newItemInput.querySelector(".new-item-textarea").value = "";
                    // Display board to show changes
                    app.updateBoard();

                }

            });

            // Add click event listener to cancel button
            card.querySelector("button.cancel-button").addEventListener("click", function () {
                // Return list to default view
                app.showElement(defaultFooter);
                app.hideElement(newItemInput);
                app.hideElement(confirmationFooter);

                // Clear input
                newItemInput.querySelector(".new-item-textarea").value = "";

            });



        }

        // Check if delete item button in item dropdown menu was pressed
        if (e.target.classList.contains("delete-item-button")) {
            console.log("Delete item");
            // Find list items's ID
            const itemId = e.target.closest(".list-group-item").id;

            // Item ID is in format "listIndex-itemIndex"
            // First it finds position of dash(-). listIndex if part of string left of dash, and itemIndex is part of string right of dash. This way should work even for large boards, with double and triple digits.
            let listIndex = itemId.substring(0, itemId.search("-"));
            let itemIndex = itemId.substring(itemId.search("-") + 1);

            // Delete item at location board.lists[listIndex]
            app.board.lists[listIndex].items.splice(itemIndex, 1);
            app.updateBoard();
        }
    }

    this.hideElement = function (e) {
        e.style.display = "none";
    }

    this.showElement = function (e) {
        e.style.display = "block";
    }

    // Listening for event
    // Div in which lists need to be inserted
    let listsRow = document.querySelector("#lists-row");
    listsRow.addEventListener("click", this.edit);
}


app.startup();