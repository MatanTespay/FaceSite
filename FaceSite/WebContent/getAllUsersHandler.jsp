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

			String user = request.getParameter("userName");
			
			JSONArray users = new JSONArray();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getUsers);
			ResultSet rs;
			
			ps.setString(1, user); 
			
			
			rs = ps.executeQuery();
						
			while(rs.next()){
				JSONObject u = new JSONObject();
				u.put("FirstName",rs.getString("firstName"));
				u.put("LastName",rs.getString("lastName"));
				u.put("user",rs.getString("username"));

				users.add(u);
				
			}
		    	
			//System.out.print(usersList + "\n");
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(users);
			
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>