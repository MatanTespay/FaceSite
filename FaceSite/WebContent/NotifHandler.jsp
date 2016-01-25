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

			String userName = request.getParameter("userName");
			JSONArray notifList = new JSONArray();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getNotif);
			ResultSet rs;
			
			ps.setString(1, userName); 
			
			
			rs = ps.executeQuery();
						
			while(rs.next()){
				JSONObject notif = new JSONObject();
				notif.put("FirstName",rs.getString("firstName"));
				notif.put("LastName",rs.getString("lastName"));
				notif.put("content",rs.getString("content"));
				
				notifList.add(notif);
				
			}
		    	
			//System.out.print(usersList + "\n");
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(notifList);
			
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>