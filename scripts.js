const addbutton = document.getElementById('add');

const updateData = () => {
    const textareadata = document.querySelectorAll('textarea');  // Because we can have more than 1 text area.
    const notesdata = [];

    textareadata.forEach((note)=>{
        return notesdata.push(note.value);

    })

    //To add something in localstorage
    localStorage.setItem('notesdata', JSON.stringify(notesdata)); // As it only sccepts strings, JSON.stringify converts it into string.
}

const addnote = (text = '') => {

    const note = document.createElement('div'); // Creating a div
    note.classList.add('note'); // adding the class the div

    const htmldata = `
            <div class="operations">
                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>

            <div class="main2 ${text ? "" : "hide"} "></div>
                <textarea class="${text ? "hide" : ""}" placeholder="Write your note here..."></textarea>
            
                    `;

    note.insertAdjacentHTML('afterbegin', htmldata); //Dynamically Generating the html code inside the div.

    //Body te div take add korar jonno.


    //The References 
    const editbtn = note.querySelector('.edit');
    const deletebtn = note.querySelector('.delete');
    const main2 = note.querySelector('.main2');
    const textarea = note.querySelector('textarea'); // textarea is a tag so we dont need ' . ' or ' # ' 


    //Deleting the Note

    deletebtn.addEventListener('click', () => {
        note.remove();
        updateData();
    })

    //Editing the Note
    textarea.value = text;
    main2.innerHTML = text;


    editbtn.addEventListener('click', () => {
        main2.classList.toggle('hide');
        textarea.classList.toggle('hide');
    })

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        main2.innerHTML=value;

        updateData();
    })

    document.body.appendChild(note);

};

//Getting back the data from localstorage

const notes = JSON.parse(localStorage.getItem('notesdata'));  // JSON.parse turns the string into a javacsript object...'notes' is the key name.

if(notes)  //If notes contains value then we call the function
{
    notes.forEach((note)=>
        addnote(note) // Adding the value of note in the textarea and div(main2) [Line No - 51, 52]
    );
}

addbutton.addEventListener('click', () =>
    addnote()
);