function check()
{
	var user = document.getElementById("user");
	var pass = document.getElementById("pass");

	if(user.value == "" || pass.value =="")
	{
		var err=document.getElementById("err");
		err.innerHTML="Username or password are empty.";
		err.style.display="inline";
		err.style.color="Red";
		return false;
	}
	
	return true;
}

