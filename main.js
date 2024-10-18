
const notesContainer = document.querySelector('.notes');
const notesKeyContainer = document.querySelector('.notes-key');

let notes = [];
let colors = [
  '#958a8f',
  '#ffbd0c',
  '#fb5508',
  '#ff0070',
  '#8438eb',
  '#3886ff',
];

function saveToLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function createAddNoteButton() {
  const addNoteButton = document.createElement('div');
  addNoteButton.classList.add('add-note');
  const addBtnContent = document.createElement('div');
  addBtnContent.classList.add('plus-sign');
  addBtnContent.innerHTML = '+';
  addNoteButton.appendChild(addBtnContent);

  addNoteButton.addEventListener('click', (e) => {
    notes.push({
      id: notes.length === 0 ? 1 : notes[notes.length - 1].id + 1,
      color: "#958a8f",
      content: ''
    });

    saveToLocalStorage();
    renderNotes();
    renderKeyColor();
  });

  return addNoteButton;
}

const addNoteButton = createAddNoteButton();

function renderKeyColor() {
  notesKeyContainer.innerHTML = ''; //= RESET HTML CODE
  colors.forEach((color) => {
    const colorNotes = notes.filter(note => note.color === color);
    if (colorNotes.length > 0) {
      const key = document.createElement('div');
      key.classList.add('key');

      const colorKey = document.createElement('i');
      colorKey.style.backgroundColor = color;
      key.appendChild(colorKey);

      key.innerHTML += `${colorNotes.length} ${colorNotes.length === 1 ? 'Note' : 'Notes'}`;
      notesKeyContainer.appendChild(key);
    }
  })
}

function renderNotes() {
  notesContainer.innerHTML = ''; //= RESET HTML CODE
  notes.length === 0 ? notesContainer.appendChild(addNoteButton) : '';

  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const deleteBtn = document.createElement('p');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = (e) => {
      notes.splice(index, 1);

      saveToLocalStorage();
      renderNotes();
      renderKeyColor();
    }

    const colorsContainer = document.createElement('div');
    colorsContainer.classList.add('colors');
    colors.forEach((color) => {
      const colorElement = document.createElement('span');
      colorElement.style.backgroundColor = color;

      colorElement.addEventListener('click', (e) => {
        contentElement.style.backgroundColor = color;
        note.color = color;

        saveToLocalStorage();
        renderKeyColor();
      });

      colorsContainer.appendChild(colorElement);
    });

    const contentElement = document.createElement('textarea');
    contentElement.classList.add('txt-area');
    contentElement.style.backgroundColor = note.color;
    contentElement.value = note.content;
    contentElement.placeholder = "Type your note";

    contentElement.addEventListener('input', (e) => {
      note.content = e.target.value;
      saveToLocalStorage();
    });

    noteElement.appendChild(deleteBtn);
    noteElement.appendChild(colorsContainer);
    noteElement.appendChild(contentElement);

    notesContainer.appendChild(noteElement);
    notesContainer.appendChild(addNoteButton);
  })
}

window.onload = () => {
  const storedNotes = localStorage.getItem('notes');

  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  }

  renderNotes();
  renderKeyColor();
}