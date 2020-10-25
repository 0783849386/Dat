
var url = 'https://0783849386.github.io/Dat/tuDien.json';
async function loadData(){
	axios.get(url).then(function(res){
	var items = res.data;
		render(items);
	});
}
function render(items){
	var listItems = document.getElementById('list-content');
	var content = items.map(function(arr){
		return '<div>' +'<span class="list-word">' +arr.english + ' - ' + arr.tiengViet + '</span>'
		+ '<button' + ' class="'+'list-btn' +'" '+ 'data-id="'+arr.english +'"' + '>'+ 'Sound'+'</button>'
		+ '<audio '+ 'id="' +arr.english+ '">'+ '</audio>' + '</div>';
	});
	listItems.innerHTML = content.join('');
}

function onlickSound(){
	var list_btn = document.querySelectorAll('.list-btn');
	for(var i=0; i< list_btn.length; i++){
		list_btn[i].addEventListener('click', function(event){
			var button = event.target;
			var id = button.dataset.id;
			var id_sound = document.getElementById(id);
			id_sound.src = "./file sound/"+ id +".mp3";
			id_sound.play();
		});
	}
}
function main(){
	loadData();
	setTimeout(onlickSound, 500);
}

main();