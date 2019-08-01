
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
		var myObj, myJSON, text, obj;
		myObj = {name:textName.value,email:textEmail.value,phone:textPhone.value,address:textAddress.value,
		vehiclemake:textMake.value,year:textYear.value,model:textModel.value};
		myJSON = JSON.stringify(myObj);
		localStorage.setItem("customerdetails", myJSON);
	}
	return isValid;
}

function search(){
	var  getval = document.getElementById("textSearch").value;
	var myurl = "searchpage.html"+"?"+"keyword="+getval;   
	window.location.assign(encodeURI(myurl));
}

function readJson(){
    text = localStorage.getItem("customerdetails");
    obj = JSON.parse(text);
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