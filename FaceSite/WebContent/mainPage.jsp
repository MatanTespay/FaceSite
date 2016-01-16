<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Main window</title>

<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="Js/mainPageFunctions.js" type="text/javascript"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>


<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="Css/style.css" />



<!-- <script type="text/javascript" src="Js/jquery.autocomplete.js"></script> -->

<!--[if lt IE 7]>
		<style type="text/css">
			#wrapper { height:100%; }
		</style>
	<![endif]-->


<%
	response.setHeader("Cache-Control","no-cache");
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragma","no-cache");
	response.setDateHeader ("Expires", 0);
%>

<%
	if (session.getAttribute("userid") == null) {
			response.sendRedirect("Login.jsp");
			return;
	}

%>
</head>

<body>
	<div id="wrapper">
		<div id="header">
			<div class="Logo_class">
				<a href="mainPage.jsp"> <img src="Pics/Facebook_Logo2.png"
					id="logo">
				</a>
			</div>
			<div class="Home_Class">
				<a href="mainPage.jsp"> <img src="Pics/home.png" id="home">
				</a> <a href="MainProfile.jsp"> <img src="Pics/profileLogo.png"
					id="profileLogo">
				</a>
			</div>
			<div class="Msg_Class">
				<div id="msg" style="float: left;">
					<a href="#"> <img src="Pics/messeges.png" id="messeges">
					</a>
				</div>
				<div id="msgDropDown" class="msg-dropdown-content">
					<table class="msg_table">
					</table>
				</div>
				<div id="notif" style="float: left;">
					<a href="#"> <img src="Pics/notify.png" id="messeges">
					</a>
				</div>
				<div id="NotifDropDown" class="notif-dropdown-content">
					<table class="msg_table">
					</table>
				</div>
				

			</div>
			<div class="LogOut_Class">
				<a id="logout" href="Login.jsp?action=logout"> <img
					src="Pics/logout.png" id="logout">
				</a>
			</div>
		</div>
		<!-- #header -->

		<div id="main">
			<div id="nav">
				<div id="searchfield">
					<form>
						<input type="text" placeholder="Search Friends"  class="biginput" onkeypress="searchFriends();" id="autocomplete">
					</form>
				</div>
				<!-- @end #searchfield -->
			
				<div id="friendsList_title" style='padding-left: 23px;'>
					<h3>Online Friends</h3>
				</div>

				<div>
					<ul id="friendsList">
					</ul>
				</div>
			</div>
			<div id="section">
				<form action="PostHandler.jsp">
				<label for="write"><b>Write something! :)</b></label> <br>
				<!--<input type="text" id="write"> -->
				<textarea name="write" id="write" rows="5" cols="45"></textarea>
				<br>
				<button id="btnPost" type="submit">Post It!</button>
				</form>
				<br> <br>
				<div id="postList"></div>
			</div>

		</div>
		<!-- #content/main -->

		<div id="footer">Copyright © Matan Tespay & Shanny Shohat</div>
		<!-- #footer -->

	</div>
	<!-- #wrapper -->

	<div id="boxes">
		<div id="dialog" class="window">
			Wellcom back
			<div id="popupfoot">
				<a href="#" class="close agree">I agree</a> | <a class="agree"
					style="color: red;" href="#">I do not agree</a>
			</div>
		</div>
		<div id="mask"></div>
	</div>
</body>

</html>