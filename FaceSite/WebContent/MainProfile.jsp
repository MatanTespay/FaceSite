<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Main window</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script src="Js/mainPageFunctions.js" type="text/javascript"></script>

<link rel="stylesheet" type="text/css" href="Css/style.css" />
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="Css/profileStyle.css">


<!--[if lt IE 7]>
		<style type="text/css">
			#wrapper { height:100%; }
		</style>
	<![endif]-->

<script type="text/javascript">
		var currentUserId =	 '<%=session.getAttribute("userid")%>';
		//alert(displyUserId);
</script>

<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>

<%
	if (session.getAttribute("userid") == null) {
		response.sendRedirect("Login.jsp");
		return;
	}

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
				<a href="mainPage.jsp"><img src="Pics/Facebook_Logo2.png"
					id="logo" border="0"></a>
			</div>
			<div class="Home_Class">
				<a href="mainPage.jsp"> <img src="Pics/home.png"
					id="profileLogo">
				</a> <a href='MainProfile.jsp?user=<%= session.getAttribute("userid") %>&catagory=Others'  > <img src="Pics/profileLogo.png"
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
						<input type="text" placeholder="Search Friends" class="biginput"
							onkeypress="getAllUsers(currentUserId);" id="autocomplete">
					</form>
				</div>
				<!-- @end #searchfield -->

				<div>
					<ul id="friendsList_title">
						<h3>Online Friends</h3>
					</ul>
				</div>

				<div>
					<ul id="friendsList"></ul>
				</div>
				
				<div>
					<a href="AllUsers.jsp" style="padding-left: 23px;">All Users</a>
				</div>
				
			</div>
			<div id="section">
				<!--Profile Content -->
				<div class="profilePics" ></div>

				<div id="fullName" style="display: inline">
				
				</div>
				
				<div id="btnAddDiv" style="display: inline">
				<img id='imgAddFriend' onclick='addFriend("#userName")' src='Pics/addUserBig.png' title='Add as a firend' alt='Add as a firend'>
				</div>

				<div id="pFriendListDiv">
					<br>
					<h2>
						<span id="titleFirends">List of Friends</span>
					</h2>
					<ul id="pFriendList">
					</ul>
				</div>

			</div>
				
				<%
					if (request.getParameter("user") != null) {
						String user = request.getParameter("user");
						
						
				%>

					
					<script type="text/javascript">
						var theuser = "<%= user %>";
						getFullName(theuser); 
						getPictures(theuser);
						getOnlineFriendsForUsers(theuser);
						var isFriend = '<%= request.getParameter("catagory") %>';
						setAddBtn(isFriend);
							
						
					</script>
		
				<%
					}

				%>


		</div>
		<!-- #content -->

		<div id="footer">Copyright © Matan Tespay & Shanny Shohat</div>
		<!-- #footer -->

	</div>
	<!-- #wrapper -->

</body>

</html>