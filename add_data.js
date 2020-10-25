var url = 'http://localhost:3000/tuDien';
// xử lý dữ liệu dư thừa khi nhập vào.

//
function addData(){
	var newEnglish = document.getElementById('add-english');
	var newTiengViet = document.getElementById('add-tiengViet');
	var newData = {
		english: newEnglish.value,
		tiengViet: newTiengViet.value
	};
	axios.post(url, newData).then(function(res){
		var result = document.getElementById('result-add');
		result.innerHTML = 'Đã thêm ' + newData.english + ' !.' ;
		inputMaster();
	});
}
//làm trắng những cái input, cải thiện tốc độ nhập dữ liệu (hihi ^^)
function inputMaster() {
	var newEnglish = document.getElementById('add-english').value = '';
	var newTiengViet = document.getElementById('add-tiengViet').value = '';
}

document.getElementById('btn-add').onclick = addData;