<html>
<head>
<%@ page language="java" contentType="text/html; charset=windows-1255"
    pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
</head>
<body>
<%
	String insert = "INSERT  into tblpost (date,content,author) values(?,?,?);";
	coreservlets.MyConnection con = (coreservlets.MyConnection)session.getAttribute("connection");
	if(con!=null)
	{
		try{

			String userid = (String)session.getAttribute("userid");
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(insert);
			java.sql.Date date = new java.sql.Date(java.util.Calendar.getInstance().getTime().getTime());
			System.out.println(request.getParameter("write"));
			ps.setDate(1, date);
			ps.setString(2, request.getParameter("write"));
			ps.setString(3, userid);
			ps.executeUpdate();
			ps.close();
	
			response.sendRedirect("mainPage.jsp");
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}

%>
</body>
</html>