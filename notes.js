console.log('Welcome to Magic notes');
showNotes();

//if user adds note add this to localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    //may be some notes already exist in localStorage so to get them
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //so we r making a array in which if notes is null then empty array is inputed and else add it to array by using JSON.parse which takes a string and returns object
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //notes jo abhi array me h usse string me convert kerenge kyuki local storage me string me set hota h

    addTxt.value = ""; //ab eski text area me likha h usse blank ke do kyuki note tho ab add ho gya ab text area khali kr do
    // console.log(notesObj);
    showNotes();
})

//function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div> `;
        //this.id wo index ko lega aur niche deleteNode function me wo index daalega 
        //ye card print hote jaa rhe h html string me
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section to add notes`;
    }
}

//function to delete a node
function deleteNote(index) {
    // use only when you make website or check it ==>console.log("I am deleting",index);

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);//splice(starting index,how many elements to be removed)
    localStorage.setItem("notes", JSON.stringify(notesObj));//ab local storage update ho jayegi
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value;
    console.log("Input event fired!", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
})
