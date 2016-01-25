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
			JSONArray msgList = new JSONArray();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getMessages);
			ResultSet rs;
			
			ps.setString(1, userName); 
			
			
			rs = ps.executeQuery();
						
			while(rs.next()){
				JSONObject message = new JSONObject();
				message.put("FirstName",rs.getString("firstName"));
				message.put("LastName",rs.getString("lastName"));
				message.put("content",rs.getString("content"));
				
				msgList.add(message);
				
			}
		    	
			//System.out.print(usersList + "\n");
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(msgList);
			
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>