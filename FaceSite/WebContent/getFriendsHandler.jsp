<%@ page language="java" contentType="text/html; charset=windows-1255"
	pageEncoding="windows-1255"%>
<%@ page import="java.sql.*"%>
<%@ page import="coreservlets.Queries"%>
<%@ page import="java.util.*"%>
<%@ page import="org.json.simple.*"%>


<%
	Queries q = new Queries();
	

	coreservlets.MyConnection con = (coreservlets.MyConnection)session.getAttribute("connection");
	
	if(con!=null)
	{
		try{
			//
			
			String userName = request.getParameter("userName");
			JSONArray usersList = new JSONArray();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getOnLineFriends);
			ResultSet rs;
			
			ps.setString(1, userName); // ignore the user from th list in users
			
			
			rs = ps.executeQuery();
						
			while(rs.next()){
				JSONObject user = new JSONObject();
				user.put("FullName",rs.getString(1));
				user.put("username",rs.getString(2));
				user.put("isOnline",rs.getBoolean(3));
				
				usersList.add(user);
				
				
			}
		    	
			//System.out.print(usersList + "\n");
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