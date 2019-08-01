
function form_validation_function()
{
	var isValid = true;

	if(textName.value == null || textName.value == "") {
		document.getElementById("error-name").innerHTML = "Name is required";
		isValid = false;
	}
	else {
		document.getElementById("error-name").innerHTML = "";
	}
	if(textEmail.value == null || textEmail.value == "") {
		document.getElementById("error-email").innerHTML = "Email is required!!";
		isValid = false;
	}
	else {
		var regexEmail = /^[0-9a-zA-Z\-._]+\@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
		if (!regexEmail.test(textEmail.value))
		{
			isValid = false;
			document.getElementById("error-email").innerHTML = "Invalid e-mail address!!";
		}
		else {
			document.getElementById("error-email").innerHTML = "";
		}
	}
	if (textPhone.value != null && textPhone.value != "") {
		var regexPhone = /^([+]\d) (\d){3} (\d){3} (\d){4}$/;
		if (!regexPhone.test(textPhone.value))
		{
			document.getElementById("error-phone").innerHTML = "Invalid phone number!!";
            isValid = false;
		}
		else {
			document.getElementById("error-phone").innerHTML = "";
		}
	}
	if(textMake.value == null || textMake.value == "") {
		document.getElementById("error-make").innerHTML = "Vehicle Make is required";
		isValid = false;
	}
	else {
		document.getElementById("error-make").innerHTML = "";
	}
	if(textModel.value == null || textModel.value == "") {
		document.getElementById("error-model").innerHTML = "Vehicle Model is required";
		isValid = false;
	}
	else {
		document.getElementById("error-model").innerHTML = "";
	}
	if(textYear.value == null || textYear.value == "") {
		document.getElementById("error-year").innerHTML = "Vehicle Year is required";
		isValid = false;
	}
	else {
		var regexYear = /^[1-2](\d){3}$/;
		if (!regexYear.test(textYear.value))
		{
			isValid = false;
			document.getElementById("error-year").innerHTML = "Invalid Year Entered!!";
		}
		else {
			document.getElementById("error-year").innerHTML = "";
		}
	}
	
	{
		var myObj = {name:textName.value,email:textEmail.value,phone:textPhone.value,address:textAddress.value,
		vehiclemake:textMake.value,year:textYear.value,model:textModel.value};

		var oldJsonData = localStorage.getItem("database_json");
		var JsonArr=[];
		if(oldJsonData){
			JsonArr = JSON.parse(oldJsonData);
		}
		JsonArr.push(myObj)

		localStorage.setItem("database_json", JSON.stringify(JsonArr));
	}
	return isValid;
}

function switch_to_searchpage(){
	var getval = document.getElementById("textSearch").value;
	var myurl = "searchpage.html"+"?"+"keyword="+getval;   
	window.location.assign(encodeURI(myurl));
}

function read_latest_data(){
	var text = localStorage.getItem("database_json");
	var dataArr = JSON.parse(text);
	var obj = dataArr[dataArr.length - 1];
    document.getElementById("name").innerHTML = obj.name;
    document.getElementById("email").innerHTML = obj.email;
    document.getElementById("phone").innerHTML = obj.phone;
    document.getElementById("address").innerHTML = obj.address;
    document.getElementById("make").innerHTML = obj.vehiclemake;
    document.getElementById("model").innerHTML = obj.model;
    document.getElementById("year").innerHTML = obj.year;
    document.getElementById("link").innerHTML = "<a href=https://www.jdpower.com/Cars/"+obj.year+"/"+obj.vehiclemake+"/"+obj.model+">Products</a>";
}

function goHomepage(){
	var myurl = "index.html";
	window.location.assign(encodeURI(myurl));
}

function searchpage_show_result(){
	var loc = location.href;
	var n1 = loc.length; // the length of url
	var n2 = loc.indexOf("="); // the location of "=equal"
	var keyword = decodeURI(loc.substr(n2+1, n1-n2)); //get the content after "=equal"
	
	var text = localStorage.getItem("database_json");
	if(!text){
		return;
	}

	var dataArr = JSON.parse(text);
	var tableData = "";
	if(keyword == null || keyword == "") {
		for (var i = 0; i < dataArr.length; i++){
			tableData += "<tr> <td>" + dataArr[i].name + "</td> <td>" + dataArr[i].email + "</td> <td>" + dataArr[i].phone + "</td> <td>" + dataArr[i].address + "</td> <td>" + dataArr[i].vehiclemake + "</td> <td>" + dataArr[i].model + "</td> <td>" + dataArr[i].year + "</td> <td>" + "<a href=https://www.jdpower.com/Cars/"+dataArr[i].year+"/"+dataArr[i].vehiclemake+"/"+dataArr[i].model+">Products</a>" + "</td> <tr>"
		}
		document.getElementById("myTbody").innerHTML = tableData;
	}
	else
	{
		var check_flag = false;
		for (var i = 0; i < dataArr.length; i++){
			if (dataArr[i].vehiclemake.toLowerCase() == keyword.toLowerCase()){
				tableData += "<tr> <td>" + dataArr[i].name + "</td> <td>" + dataArr[i].email + "</td> <td>" + dataArr[i].phone + "</td> <td>" + dataArr[i].address + "</td> <td>" + dataArr[i].vehiclemake + "</td> <td>" + dataArr[i].model + "</td> <td>" + dataArr[i].year + "</td> <td>" + "<a href=https://www.jdpower.com/Cars/"+dataArr[i].year+"/"+dataArr[i].vehiclemake+"/"+dataArr[i].model+">Products</a>" + "</td> <tr>"
				check_flag = true;
			}
		}
		if(check_flag){
			document.getElementById("myTbody").innerHTML = tableData;
		}
		else{
			document.getElementById("result_message").innerHTML = "Sorry, Did Not Find That Car!";
		}
	}
}