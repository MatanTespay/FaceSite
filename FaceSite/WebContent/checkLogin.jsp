<%@ page language="java" contentType="text/html; charset=windows-1255"
	pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
<% 
	coreservlets.MyConnection con = new coreservlets.MyConnection();
	session.setAttribute("connection", con);

%>

<%
	String userid = request.getParameter("user");
	String pwd = request.getParameter("pass");
	//int userNumber = 6;
	
	PreparedStatement ps = null;
	ResultSet rs;
	String query = "SELECT *\n" +
			"FROM tbluser \n" +
			"WHERE username = ? AND password = ?";
	ps=con.getConnection().prepareStatement(query);
	ps.setString(1, userid);
	ps.setString(2, pwd);
    rs = ps.executeQuery();
	
	if (rs.next()) {
		session.setAttribute("userid", userid);

	//out.println("welcome " + userid);
		//out.println("<a href='logout.jsp'>Log out</a>");
		response.sendRedirect("mainPage.jsp");
	} else {
		con.closeConnection();
		out.println("Invalid password <a href='Login.jsp'>Try again</a>"
				+ userid + userid);
	}
%>