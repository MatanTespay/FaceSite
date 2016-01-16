<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Facebook</title>

<link rel="stylesheet" href="Css/reset.css">
<link rel='stylesheet prefetch'
	href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900|RobotoDraft:400,100,300,500,700,900'>
<link rel='stylesheet prefetch'
	href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/Css/font-awesome.min.css'>
<link rel="stylesheet" href="Css/loginRegStyle.css">
<!--  <script src="Js/loginCheck.js" type="text/javascript"></script>-->
<script>
	function register()
	{
		window.open("Register.jsp","_self");
	}
</script>

<% 
    //create a connection and store it in session attribute
	coreservlets.MyConnection con = new coreservlets.MyConnection();
	session.setAttribute("connection", con);

%>

<%
	
	if (request.getParameter("action") != null) {
		if (request.getParameter("action").equals("logout")) {
			session.setAttribute("userid", null);
			
			//get the connection
			con = (coreservlets.MyConnection)session.getAttribute("connection");
			if(con!=null) //close the connection on logout
			{
				//TODO: change this...
			/*	con.closeConnection();
				session.setAttribute("connection", null);*/
			}
			
			request.getSession().invalidate();
		/* %>
			 <script type="text/javascript">
			 alert("session cleaned: " +  '<%= session.getAttribute("userid")  %>');
			 // test first commit from shanny 
			 </script>
			 <% */
		}
	}
%>
</head>

<body>


	<!-- Form Mixin-->
	<!-- Input Mixin-->
	<!-- Button Mixin-->
	<!-- Pen Title-->
	<div class="pen-title">
		<span><img src="Pics/facebookInitLogo.png"></img></span>
	</div>
	<!-- Form Module-->
	<div class="module form-module">
		<div class="toggle">
			<i class="fa fa-times fa-pencil"></i>

		</div>
		<div class="form">
			<h2>Login to your account</h2>
			<form onsubmit="return check()" method="post" action="checkLogin.jsp">
				<input type="text" name="user" placeholder="Username" id="user">

				<input type="password" name="pass" placeholder="Password" id="pass">

				<div id="err"></div>

				<button id="login" type="submit">Login</button>
			</form>

			<button id="reg" type="button" onclick="register()">Register</button>
		</div>

		<div class="cta">
			<a href="#">Forgot your password?</a>
		</div>
	</div>
	<script>
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'</script>





</body>
</html>
