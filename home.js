
const url1 = 'http://localhost:3000/tuDien';
const url2 = 'http://localhost:3000/daHoc';

var count = 0;
let count_word_true = 0;
let count_char_true = 0;
let play_time = false;// Thời gian đếm dừng lại.
let status_really = true; // Trạng thái sẵn sàng.
let time_play = document.getElementById('time-play');
let list_content = []; // Mảng chứa obj nội dung gõ

function render(items){
	var content_box = document.getElementById('content-box');
	var content = items.map(function(arr){
		return '<span>' + arr.english 
				+ '<div class = "tooltip">' + arr.tiengViet + '</div>'	+ '</span>'
				+ '<audio id="' +arr.english+ '"></audio>';
		});
	content_box.innerHTML = content.join('');
}
function loadData(){
	var items_daHoc = [];
	axios.get(url2).then(async function(res){
		var list_random = [];
		var  items_daHoc = res.data;
		var items = [];
		var idx_item = 0;
		axios.get(url1).then(async function(res){
			items_tuDien = res.data;
			for(var i=0; i<items_tuDien.length; i++){
				var count = 0;
				for(var j=0; j<items_daHoc.length; j++){
					if(items_tuDien[i].id == items_daHoc[j].id){
						count++;
						break;
					}
				}
				if(count == 0){
					items[idx_item] = items_tuDien[i];
					idx_item++;
				}
			}
		let around_size;
		if(items.length < 10) around_size = 10;
		else if(items.length < 100) around_size = 100;
				else if(items.length < 1000) around_size = 1000;
		if(items.length == 0) 
			alert("Không còn từ vựng để học!");
		else {
			for(var i=0; i<30; i++){
				var index_random = Math.floor(Math.random()*around_size) % items.length;
				list_content[i] = items[index_random];
			}
			render(list_content);
		}
		// First position	
		var firstSpan = document.querySelector("span");
			firstSpan.style.backgroundColor = '#ddd';
		var firstTooltip = document.querySelector('.tooltip');
			var lastIdx = firstSpan.innerHTML.lastIndexOf('<div');
			var english_content = firstSpan.innerHTML.substring(0, lastIdx);
			let content = english_content + ": " + firstTooltip.innerHTML;
			setContentHead(content);			
		});

	});
}

function textInput(event){
	var content = document.getElementById('input-keybroad');
	if(play_time == false && status_really == true){
		resultInfor();
		play_time = true;
		status_really = false;
	}
	if(content.value.length == 1 && play_time == true) sound(count); // phát âm thanh tại vị trí key
	if(event.which == 32){
		var lastIdx = content.value.lastIndexOf(' ');
		var temp = content.value.substring(0, lastIdx);
		content.value = '';
		if(play_time == true && status_really == false) testing(temp, count); // Nếu còn thời gian thì kiểm tra
		if(count == 29){
			count = 0;
			loadData();
		}
		else count++;	
	}
}

function testing(temp, idx){
	var list_content = document.querySelectorAll('span');
	var list_tooltip = document.querySelectorAll('.tooltip');
		list_content[idx].style.backgroundColor = 'white';
		if(idx < 29) list_content[idx+1].style.backgroundColor = '#ddd';
	var lastIdx = list_content[idx].innerHTML.lastIndexOf('<div');
	var english_content = list_content[idx].innerHTML.substring(0, lastIdx);
	if(temp == english_content){
		list_content[idx].style.color = 'blue';
		count_char_true += temp.length;
		count_word_true++;
	}else {
		list_content[idx].style.color = 'red';
	}
	if(idx < 29){
		var lastIdxNext = list_content[idx+1].innerHTML.lastIndexOf('<div');
		var english_content_next = list_content[idx+1].innerHTML.substring(0, lastIdxNext);
		let content = english_content_next + ': ' + list_tooltip[idx+1].innerHTML;
			setContentHead(content);		
	}	
}

function resultInfor(){
	var count_time = 60;
	var myVar = setInterval(function(){
		count_time--;
		time_play.innerHTML = '';
		if(status_really == true || play_time == false){ //Thì đặt lại thời gian
			clearInterval(myVar);
			play_time = false;
			if(status_really == true) time_play.innerHTML = '1:00';
		}else{
			time_play.innerHTML = count_time;
		}
		if(count_time == 0) { //Khi thời gian về 0 ( dừng gõ, dừng đếm)
			clearInterval(myVar);
			var content_box = document.getElementById('content-box');
			content_box.innerHTML = '';
			content_box.innerHTML = '<span>'+ 'Số ký tự đúng: ' + count_char_true +'</span>';
			content_box.innerHTML += '<span>' + "Số từ đúng: " + count_word_true + '</span>';
			play_time = false;
		}
	}, 1000);
}

function eventClickButton(){
	loadData();
	var content = document.getElementById('input-keybroad');
	content.value = '';
	count = 0;
	count_char_true = 0;
	count_word_true = 0;
	status_really = true;
	time_play.innerHTML = '1:00';
}
function setContentHead(english){
	var content = document.getElementById('content-head');
	content.innerHTML = english;
}
function sound(idx_count){
	const english_word = list_content[idx_count].english;
  	const id_sound = document.getElementById(english_word);
      id_sound.src = "./file sound/"+ english_word +".mp3";
      id_sound.play();
}
function main(){
	loadData();
	var btn_start = document.getElementById('start');
	btn_start.addEventListener('click', eventClickButton);
}
main();