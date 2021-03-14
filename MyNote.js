console.log('notes is working')


makeNote();
function saveNote() {
	let notes = localStorage.getItem("notes");
	let title = localStorage.getItem("title");
	// console.log(title);
	if (notes==null) {
		var noteObj = [];
		var titleData = [];
	}
	else{
		noteObj = JSON.parse(notes);
		titleData = JSON.parse(title);
	}
	let txtData = document.getElementById("addText").value;
	noteObj.push(txtData);

	let titleField = document.getElementById("title1").value;
	titleData.push(titleField);

	// console.log("titleField :",titleField);
	// console.log("notesValue :",txtData);

	localStorage.setItem("notes",JSON.stringify(noteObj));
	localStorage.setItem("title",JSON.stringify(titleData));
	// console.log(titleData);
	// console.log(noteObj);
	document.getElementById("addText").value="";
	document.getElementById("title1").value="";

	makeNote();
}


function makeNote()
{
	let notes = localStorage.getItem("notes");
	let title = localStorage.getItem("title");
	if (notes==null) {
		var noteData = [];
		var titleData = [];
	}
	else{
		noteData = JSON.parse(notes);
		titleData = JSON.parse(title);
	}
	let textAdd = document.getElementById("note");
	var html ="";
	for (var i = 0; i < noteData.length; i++) {
		var msg = noteData[i];
		var ttl = titleData[i];
		if(msg){
			html = html +
			`<div class="noteCard mx-2 my-2" style="width: 18rem;">
			<div class="card-body">
			<h5 class="card-title titlebold">${ttl} </h5>
			<hr>
			<p class="card-text">${msg}</p>
			<button id="${i}" type="button" class="btn btn-dark clrbtn" onclick="deleteNote(this.id)">DeleteNote</button>
			<button id="${i}" type="button" class="btn btn-dark clrbtn" onclick="editNote(this.id)">EditNote</button>
			</div>
			</div>
			`
		}
	}
	if(noteData.length==0)
		textAdd.innerHTML = "Add Your Notes Here!"
	else{
		textAdd.innerHTML=html;
	}		
}



function deleteNote(index) {
	// console.log("i am deleteNote",index);
	let notes = localStorage.getItem("notes");
	let title = localStorage.getItem("title");
	if (notes==null) {
		var data = [];
		var titleData = [];
	}
	else{
		data = JSON.parse(notes);
		titleData = JSON.parse(title);
	}

	data.splice(index,1);//deleting note
	localStorage.setItem("notes",JSON.stringify(data));
	titleData.splice(index,1);//deleting title
	localStorage.setItem("title",JSON.stringify(titleData));
	makeNote();
}



function editNote(index) {
	console.log("editNote ",index);

	let textArea = document.getElementById("addText");
	let notes = localStorage.getItem("notes");
	noteData = [];

	noteData = JSON.parse(notes);
	textArea.value = noteData[index];
	let titleField = document.getElementById("title1");
	let title = localStorage.getItem("title");
	// console.log(noteData);
	titleData = [];
	titleData = JSON.parse(title);
	titleField.value = titleData[index];

	let btnChange = document.getElementById("edtchange");
	// btnChange.innerHTML = "SaveNote";

	let html = `<button id="${index}" type="button" class="btn btn-dark my-2 clrbtn" onclick="upDate(this.id)">SaveNote</button>`
	btnChange.innerHTML = html;
	// upDate(index);
	// deleteNote(index);
	// saveNote();
}


function upDate(index) {
	// console.log("upDate working");
	let notes = localStorage.getItem("notes");
	let title = localStorage.getItem("title");
	let noteData = [];
	let titleData = [];
	noteData = JSON.parse(notes);
	titleData = JSON.parse(title);
	let txtData = document.getElementById("addText").value;
    noteData[index] = txtData;

	let titleField = document.getElementById("title1").value;
	titleData[index] = titleField;

	localStorage.setItem("notes",JSON.stringify(noteData));
	localStorage.setItem("title",JSON.stringify(titleData));
	console.log(noteData);

	let btnChange = document.getElementById("edtchange");
	btnChange.innerHTML = `<button id="addBtn" type="button" class="btn btn-dark my-2 clrbtn" onclick="saveNote()">AddNote</button>`;
	makeNote();

}


let search = document.getElementById("searchText");

search.addEventListener("input",function(){

	let inputVal = search.value.toLowerCase();
	// console.log("input event is fired : ",inputVal);
	var notecard = document.getElementsByClassName("noteCard");
	// var notecard = document.getElementsByClassName("card-text");
	for (var i = 0; i < notecard.length; i++) {
		var val = notecard[i].children[0].getElementsByTagName("p")[0].innerText; 
		// console.log(notecard[i]);
		val.toLowerCase();
		if(val.includes(inputVal))
		{
			// console.log(val);
			notecard[i].style.display = 'block';
		}
		else
		{
			notecard[i].style.display = 'none';
		}

	}
	// console.log(notecard);

})


// function test()
// {
// 	console.log("i am test");
// 	let ids = document.getElementsByClassName("noteCard");
// 	// console.log(ids[0].children[0].getElementsByTagName("p"));
// 	console.log(ids);
// 	let ele = ids[0].children[0].getElementsByTagName("p")[0];
// 	console.log(ids[0].children);
// 	console.log(ele.innerHTML);
// }






