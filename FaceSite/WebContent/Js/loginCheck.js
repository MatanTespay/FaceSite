function check()
{
	var user = document.getElementById("user");
	var pass = document.getElementById("pass");

	if(user.value != "Admin" || pass.value!="Admin")
	{
		var err=document.getElementById("err");
		err.innerHTML="Username or password are incorrect.";
		err.style.display="inline";
		err.style.color="Red";
		return false;
	}
	
	return true;
}

function register()
{
	window.open("Register.jsp","_self");
}