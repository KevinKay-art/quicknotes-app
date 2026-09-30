const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

function render() {
    notesList.textContent = "";

    for (const note of notes) {
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");
        listItem.classList.add(`category-${note.category}`);

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;
        categoryLabel.classList.add("category-label");

        const date = document.createElement("small");
        date.textContent = note.createdAt;
        date.classList.add("note-date");

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            notes = notes.filter(item => item.id !== note.id);
            render();
        });

        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(date);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    }

    updateCount();
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    render();

    noteInput.value = "";
});