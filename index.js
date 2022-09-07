let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addTxt = document.getElementById("note-text");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

addBtn.addEventListener("click", (e) => {
    if(addTitle.value == "" || addTxt.value == ""){
        return alert("Please Add Note Title and Details");
    }

    let  notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    
    let dateObj = new Date(),
    month = months[dateObj.getMonth()],
    day = dateObj.getDate(),
    year = dateObj.getFullYear(),
    hrs = dateObj.getHours(),
    min = dateObj.getMinutes(),
    meri = hrs >= 12 ? 'PM' : 'AM';
    if(min<10){
        min = '0'+min;
    }
    
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        date: `${month} ${day}, ${year} ${hrs}:${min} ${meri}`
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";

    showNotes();
})

function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(ele, index){
        html += `
        <div id="note">
        <p class="note-time">${ele.date}</p>
        <h3 class="note-title">${ele.title}</h3>
        <p class="note-text">${ele.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note <i class="material-icons del">delete</i></button>
        <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note <i class="material-icons edit">edit_note</i></button>
        </div>
        `;
    });

    let noteEle = document.getElementById("notes");
    if(notesObj.length != 0){
        noteEle.innerHTML = html;
    }
    else{
        noteEle.innerHTML = `Nothing to show!! Use "Add Note" Section for creating your notes.`;
    }
}
function deleteNote(ind){
    let delmsg = confirm("You are deleting this note");
    if(delmsg == true){
        let notes = localStorage.getItem("notes");
        if(notes == null){
            notesObj = [];
        }
        else{
            notesObj = JSON.parse(notes);
        }
        
        notesObj.splice(ind, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}
function editNote(ind){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    addTitle.value = notesObj[ind].title;
    addTxt.value = notesObj[ind].text;
    notesObj.splice(ind,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();