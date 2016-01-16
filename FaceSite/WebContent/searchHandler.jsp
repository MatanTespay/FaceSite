<%@ page language="java" contentType="text/html; charset=windows-1255"
	pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
<%@ page import="coreservlets.Queries"%>
<%@ page import="java.util.*"%>
<%@ page import="org.json.simple.*"%>


<%
	Queries q = new Queries();
	String getAllUsers = q.getAllUsers;

	coreservlets.MyConnection con = (coreservlets.MyConnection)session.getAttribute("connection");
	
	if(con!=null)
	{
		try{
			//
			String prefix = request.getParameter("prefix");
			String userName = request.getParameter("userName");
			JSONArray usersList = new JSONArray();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(getAllUsers);
			ResultSet rs;
			ps.setString(1, prefix + "%"); //search friends start with prefix in users table
			ps.setString(2, userName); // ignore the user from th list in users
			ps.setString(3, prefix + "%"); //search friends start with prefix in friends table
			ps.setString(4, userName);  // ignore the user from th list in friends
			ps.setString(5, userName); // and get all users that not his friends already
			
			rs = ps.executeQuery();
						
			while(rs.next()){
				JSONObject user = new JSONObject();
				user.put("FullName",rs.getString(1));
				user.put("username",rs.getString(2));
				user.put("Category",rs.getString(3));
				usersList.add(user);
				
				
			}
		    	
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(usersList);
			
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>