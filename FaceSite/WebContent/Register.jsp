<!DOCTYPE html>
<html>
<head>
<meta charset="windows-1255">

<script src="Js/registration.js" type="text/javascript" ></script>
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900|RobotoDraft:400,100,300,500,700,900'>
    <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/Css/font-awesome.min.css'>
	<link rel="stylesheet" type="text/css" href="Css/loginRegStyle.css">

<title>Registration Form</title>
	<%
	if (session.getAttribute("userid") != null) {
		if (session.getAttribute("userid").equals("Admin")) {
			response.sendRedirect("mainPage.jsp");
		} else {
			//user hasn't log in keep load page
		}
	}

	else {
		//user hasn't log in keep load page >>>>>>>
	}
	%>
	
</head>
<body>
<div class="pen-title">
  <span><img src="Pics/facebookInitLogo.png"></img></span>
</div>
<div class="module form-module">
	
	  <h2 style="display:none;"> </h2>
	<div class="form"> 
	<h2>Register</h2>
	  <form id="registerForm" name="myForm" action="RegisterHandler.jsp" onsubmit="return onBtnClick()" method="post"> 
	 <label id="icon" for="name"><i class="icon-envelope "></i></label>
	  <input type="text" name="fn"  id="fn" onblur="OnlyLetters(this, fnErr)" placeholder="First Name" class="regInput" />
	  <span id="fnErr" class="error" style="display: none;"></span>
		<label id="icon" for="name"><i class="icon-user"></i></label>
	  <input type="text" name="ln"  id="ln" onblur="OnlyLetters(this, lnErr)" placeholder="Last Name" class="regInput"/>
	   <span  id="lnErr" class="error" style="display: none;"> </span>
	  
		<label id="icon" for="name"><i class="icon-user"></i></label>
	  <input type="text"  name="userRegister" id="userRegister" onblur="userValidate(this,userErr)" placeholder="User Name" class="regInput"/>
	  <span  id="userErr" class="error" style="display: none;"></span>
	 
	   <label id="icon" for="name"><i class="icon-user"></i></label>
	  <input type="text" name="email" id="email" onblur="validateEmail(this,emailErr)" placeholder="Email" class="regInput"/>        
	 <span id="emailErr"  class="error" style="display: none;"></span>
	 
	   <label id="icon" for="name"><i class="icon-user"></i></label>
	  <input type="password" name="password"  id="password" onblur="passwordCheck(this,cfmPassword,passErr,cfmPasswordErr)" placeholder="Password" class="regInput" /> 
	 <span id="passErr" class="error"></span>
	   <label id="icon" for="name"><i class="icon-user"></i></label>
	 
	  <input type="password" name="cfmPassword"  id="cfmPassword" onblur="passwordCheck(this,password,cfmPasswordErr,passErr)" placeholder="Confirm Password" class="regInput" />
	   <span id="cfmPasswordErr" class="error" style="display: none;"></span>
	  <button id="Sendbtn" class="button" type="submit" >Send</button>   
	   
	  </form>
  </div>
 </div> 
</div>
</body>
</html>