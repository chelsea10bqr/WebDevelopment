/*get the value of every input field*/
var Name = document.getElementById("name");
var email = document.getElementById("email");
var tel = document.getElementById("tel");
var zip = document.getElementById("zip");
var pass = document.getElementById("pass");
var confirm = document.getElementById("confirm");
var passstorage = "test";  /*set the original password and store it in this variable*/
function loadpass(valtest){
	var str = "";
					for (let i = 0; i < valtest.length; i++) {
 						 str += "*";                         /*convert the password into "*" */
					}
  document.getElementById("holdpass").innerHTML=str;
  document.getElementById("holdpassconfirm").innerHTML=str;
}
function validate(){
var flag = true;
document.getElementById("alert").innerHTML = "";    /*clear the alert text once the submit button pressed*/
document.getElementById("alertname").innerHTML = "";   /*clear the alert message for each field once the submit button pressed*/
	if(Name.value!=""){
  		var valname = /^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
      if(Name.value.match(valname)==null){     /* if the value is not matched, we will send a alert message on each input field*/
      		flag = false;
          document.getElementById("alertname").innerHTML = "Name can only be upper or lower case letters and numbers, but may not start with a number."
      }
  }
  var temp1 = document.getElementById("holdname").innerHTML;       /*to check whether user input the same value as before*/
  document.getElementById("alertemail").innerHTML = ""; 
	if(email.value!=""){
  		var valemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email.value.match(valemail)==null){
      		flag = false;
          document.getElementById("alertemail").innerHTML = "The Email format is not correct";
      }
  }
  var temp2 = document.getElementById("holdemail").innerHTML;
  document.getElementById("alerttel").innerHTML = "";
	if(tel.value!=""){
  		var valtel = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
      if(tel.value.match(valtel)==null){
      		flag = false;
          document.getElementById("alerttel").innerHTML = "The Phone Number format should be 123-123-1234(10 digits)";
      }
  }
  var temp3 = document.getElementById("holdtel").innerHTML;
  document.getElementById("alertzip").innerHTML = "";
	if(zip.value!=""){
			var valzip = /^([0-9]{5})$/; 
      if(zip.value.match(valzip)==null){
      		flag = false;
      	  document.getElementById("alertzip").innerHTML = "Please enter 5-digit zipcode";
      }
  }
  var temp4 = document.getElementById("holdzip").innerHTML;
  document.getElementById("alertpass").innerHTML = "";
  if(pass.value!=""||confirm.value!=""){
     if(pass.value!=confirm.value){
     			flag = false;
          document.getElementById("alertpass").innerHTML = "Two Passwords are not the same";
     }
  }
  if(flag == true){        /*if flag is true, user meets every requirment for change information*/
  		if(Name.value != temp1&&Name.value!=""){
      		document.getElementById("holdname").innerHTML = Name.value;
          document.getElementById("alert").innerHTML += "Your display name has been changed to " + Name.value + "<br/>";
      }else{
      		Name.value = "";
      }
      if(email.value != temp2&&email.value!=""){
      		document.getElementById("holdemail").innerHTML = email.value;
          document.getElementById("alert").innerHTML += "Your Email Address has been changed to " + email.value + "<br/>";
      }else{
      		email.value = "";
      }   
      if(tel.value!= temp3&&tel.value!=""){
      		document.getElementById("holdtel").innerHTML = tel.value;
          document.getElementById("alert").innerHTML += "Your Phone Number has been changed to " + tel.value + "<br/>";
      }else{
      		tel.value = "";
      }
      if(zip.value != temp4&&zip.value!=""){
      		document.getElementById("holdzip").innerHTML = zip.value;
          document.getElementById("alert").innerHTML += "Your Zip Code has been changed to " + zip.value + "<br/>";
      }else{
      		zip.value = "";
      }
      if(passstorage != pass.value&&pass.value!=""){      /*validate whether the password and confirim is the same*/
      		loadpass(pass.value);
          passstorage = pass.value;
          document.getElementById("alert").innerHTML += "Your Password has been changed <br/>";
      }else{
		pass.value = "";
		confirm.value = "";
      }
  }else{ 
    
          document.getElementById("alert").innerHTML += "Please check every field's requirement. <br/> ";
  		
  }
}