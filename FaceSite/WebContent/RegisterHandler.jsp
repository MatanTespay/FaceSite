<%@ page language="java" contentType="text/html; charset=windows-1255"
	pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
<%
	String insert = "INSERT  into tbluser  values(?,?,?,?,?,?,?,?);";
	coreservlets.MyConnection con = (coreservlets.MyConnection)session.getAttribute("connection");
	if(con!=null)
	{
		out.print(request.getParameter("userRegister"));
		try{
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(insert);
	/*		ps.setString(1, arg1);
			ps.setString(2, arg1);
			ps.setString(3, arg1);
			ps.setString(4, arg1);
			ps.setString(5, arg1);
			ps.setString(6, arg1);
			ps.setString(7, arg1);
			ps.setString(8, arg1);*/
		}
		catch(SQLException e)
		{
			
		}
	}
%>