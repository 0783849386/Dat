var url1 = 'https://0783849386.github.io/Dat/tuDien.json';
var url2 = 'https://0783849386.github.io/Dat/daHoc.json';

 function loadData(url){
	axios.all([
  		axios.get(url2),
  		axios.get(url1)
		]).then(axios.spread(async function(res1, res2){
  			var items1 = res1.data;
  			var items2 = res2.data;
  			var result = [];
  			var idx = 0;
  			for(var i=0 ; i < items2.length; i++){
  				var count = 0;
  				for(var j=0 ; j < items1.length ; j++){
  					if(items2[i].id === items1[j].id) {
  						count++;
  						break;
  					}
  				}
  				if(count == 0) {
  					result[idx] = items2[i];
  					idx++;
  				}
  			}
  		render(result);
      setTimeout(onclickButton, 500);
      setTimeout(onlickSound, 500);
	}));
}
function render(items){
  var listItems = document.getElementById('list-content');
  var content = items.map(function(arr){
    return '<div>' +'<span class="list-word">' +arr.english + ' - ' + arr.tiengViet + '</span>'
          + '<button class="list-btn" data-id="'+arr.english +'">Sound</button>'
          + '<audio id="' +arr.english+ '"></audio>' 
          + '<button class="list-btn-learned" data-id="'+arr.id +'">Learned</button>' 
          + '</div>';
  });
  listItems.innerHTML = content.join('');
}
function onclickButton(){
  var list_btn_learned = document.querySelectorAll(".list-btn-learned");
  var list_btn_priority = document.querySelectorAll(".list-btn-priority");

  for(var i=0; i < list_btn_priority.length; i++){
      list_btn_priority[i].addEventListener('click', function(event){
        var button = event.target;
      var id = button.dataset.id;
      if(id != undefined)  addData(url3, id); //url uu tien
    });
  }
  for(var i=0; i < list_btn_learned.length; i++){
      list_btn_learned[i].addEventListener('click', function(event){
      var button = event.target;
      var id = button.dataset.id;
      if(id != undefined)  {
        addData(url2, id); // url da hoc
      }
    });
  }
}
function addData(url, id){
  axios.get(url1).then(function(res){
  var items = res.data;
      for(var i=0; i < items.length; i++){
        if(items[i].id == id){
            axios.post(url, items[i]).then(function(res){
              loadData();
            });
        }
      }
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
}
main();