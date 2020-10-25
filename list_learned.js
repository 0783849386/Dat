
var url = 'https://0783849386.github.io/Dat/daHoc.json';
function loadData(){
	axios.get(url).then(function(res){
	var items = res.data;
		render(items);
	});
}

function render(items){
	var listItems = document.getElementById('list-content');
	var content = items.map(function(arr){
		return '<div> <span class="list-word">' +arr.english + ' - ' + arr.tiengViet + '</span>'
          + '<button class="list-btn" data-id="'+arr.english +'">Sound</button>'
          + '<audio id="' +arr.english+ '"></audio>' 
          + '<button class="btn-delete" data-id="'+arr.id +'">Học lại</button>'
          + '</div>';
	});
	listItems.innerHTML = content.join('');
}

function clickButton(){
  var btn_delete = document.querySelectorAll('.btn-delete');
  for(var i=0; i<btn_delete.length; i++){
    btn_delete[i].addEventListener('click', onclickData);
  }
}

function onclickData(event){
  var button = event.target;
  var id = button.dataset.id;
 	if(id != undefined)  deleteData(id);
}

function deleteData(itemsId){
  var btn_item = 'btn-' + itemsId;
  var idDelete = document.getElementById(btn_item);
  var link = url + '/' + itemsId;
  axios.delete(link).then(function(res){
    console.log('Deleted!');
    main();
  }).catch(function(err){
    console.log(err);
  });
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
  setTimeout(clickButton, 500);
}
main();