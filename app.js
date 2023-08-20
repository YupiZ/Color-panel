const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const columns = document.querySelectorAll('.col');

function getRandomNumber(){
    return Math.floor(Math.random() * hex.length );

}
function getRandomColor(){
	let newColor = '#';
	const randomNum= getRandomNumber;
	for ( let i=0; i<6; i++){
		newColor+=hex[randomNum()];	}
	return newColor;
}
function setTextColor(text, color){
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function setColors(initial, specificColumn){
	const colors = initial? getHashColors():[];
columns.forEach((column, index) => {
	if (specificColumn && column !== specificColumn) return;

	const text= column.querySelector('h2');
	const btn = column.querySelector('button');
	const refresh = column.querySelector('.refresh');
	const isLocked = column.querySelector('i').classList.contains('fa-lock');
	if(isLocked){
		colors.push(text.textContent)
		return
	}

	const color= initial
	? colors[index]
		?colors[index]
		: getRandomColor()
		: getRandomColor();

	if(!initial){
		colors.push(color);
}

	column.style.backgroundColor = color;
	text.textContent= color;

	setTextColor(text,color)
	setTextColor(btn,color)
	setTextColor(refresh,color)
})
updateColorsHash(colors);
}

document.addEventListener('click', (event)=>{
	const type = event.target.dataset.type
	if(type==="lock"){
		const lock= event.target.tagName.toLowerCase()==='i' ? event.target
		:event.target.children[0]

		lock.classList.toggle('fa-lock-open')
		lock.classList.toggle('fa-lock')
	}else if (type === 'copy'){
		copyToClipboard(event.target.textContent)
	}else if (type ==="refresh"){
		const column = event.target.closest('.col');
        setColors(false, column);


	}

})

document.addEventListener('keydown',(event)=>{

	if( event.code.toLowerCase()==='space'){
		setColors();
		event.preventDefault();
	}
})

function copyToClipboard(text){
	return navigator.clipboard.writeText(text)
}

function updateColorsHash(colors =[]) {
	document.location.hash = colors
	.map((col) => {return col.toString().substring(1)})
	.join('-')
}


function getHashColors(){
	if (document.location.hash.length > 1){
		return document.location.hash
		.substring(1)
		.split('-')
		.map(color=> '#' + color)
	}
	return[]
}
setColors(true);

let modal = document.querySelector('.modal');
let closeBtn = document.querySelector('.btn');
let overlay = document.querySelector('.overlay');

// Close the modal and hide the overlay
closeBtn.onclick = function() {
    modal.style.display = "none";
    overlay.classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', function() {
    if(!localStorage.getItem('modalShown') || localStorage.getItem('modalShown') !== 'true'){
        modal.style.display = "flex";
        overlay.classList.remove('hidden');
        localStorage.setItem('modalShown', 'true');
    }
})