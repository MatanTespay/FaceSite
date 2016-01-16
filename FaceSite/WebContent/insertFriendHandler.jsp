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
			boolean res;
			String user = request.getParameter("user");
			String friend = request.getParameter("friend");
			JSONObject data = new JSONObject();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.insertFriednd);
			
			ps.setString(1, user); //the user
			ps.setString(2, friend); // the friend
		
			int result = ps.executeUpdate();
						
			if(result > 0){
				res = true;
				ps.setString(1, friend); //the user
				ps.setString(2, user); // the friend
				 result = ps.executeUpdate();
				 if(result > 0){
					 data.put("result",true);
					
				 }else{
					 data.put("result",false);
				 }
			
			}
			else{
				res = false;
				data.put("result",false);
			}
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(data);
			
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>