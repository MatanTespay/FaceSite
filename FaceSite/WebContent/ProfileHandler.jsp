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
			String username = request.getParameter("userName");
			System.out.println("username was sent: "+username);
			ResultSet rs;
			//String userid = (String)session.getAttribute("userid");
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getUserDetails);
			ps.setString(1, username);
			rs = ps.executeQuery();
			
			if(rs.next())
			{
				JSONObject user = new JSONObject();
				user.put("FirstName",rs.getString("firstName"));
				user.put("LastName",rs.getString("lastName"));
				user.put("profile",rs.getString("profilePic"));
				user.put("cover",rs.getString("coverPic"));
				user.put("username",rs.getString("username"));
				
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().print(user);
			}
			
			ps.close();
			

		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}

%>