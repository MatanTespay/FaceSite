<%@ page language="java" contentType="text/html; charset=windows-1255"
	pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
<%
	String insert = "INSERT  into tbluser  values(?,?,?,?,?,?,?,?);";
	coreservlets.MyConnection con = (coreservlets.MyConnection)session.getAttribute("connection");
	if(con!=null)
	{
		try{
			String userid = request.getParameter("userRegister");
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(insert);
			ps.setString(1, userid);
			ps.setString(2, request.getParameter("fn"));
			ps.setString(3, request.getParameter("ln"));
			ps.setString(4, request.getParameter("password"));
			ps.setString(5, request.getParameter("email"));
			ps.setString(6, "Pics/noPic.png");
			ps.setString(7, "Pics/noCover.png");
			ps.setInt(8, 1);
			ps.executeUpdate();
			ps.close();
			session.setAttribute("userid", userid);
			response.sendRedirect("mainPage.jsp");
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>