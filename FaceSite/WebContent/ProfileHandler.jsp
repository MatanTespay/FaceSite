<%@ page language="java" contentType="text/html; charset=windows-1255"
    pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
<%@ page import="coreservlets.Queries"%>
<%@ page import="org.json.simple.*"%>
<%
	Queries q = new Queries();
	coreservlets.MyConnection con = (coreservlets.MyConnection)session.getAttribute("connection");
	if(con!=null)
	{
		try{
			ResultSet rs;
			String userid = (String)session.getAttribute("userid");
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getUserDetails);
			ps.setString(1, userid);
			rs = ps.executeQuery();
			
			if(rs.next())
			{
				JSONObject user = new JSONObject();
				user.put("FirstName",rs.getString(1));
				user.put("username",rs.getString(2));
				user.put("isOnline",rs.getBoolean(3));
			}
			
			ps.close();
			

		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}

%>