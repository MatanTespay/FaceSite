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
			String postid = request.getParameter("post");
			String content = request.getParameter("content");
			String user = request.getParameter("userName");
			JSONObject data = new JSONObject();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.insertComment);
			
			ps.setInt(1, Integer.parseInt(postid)); 
			ps.setString(2, content); 
			ps.setString(3, user);
		
			int result = ps.executeUpdate();
						

				 if(result > 0){
					 data.put("result",true);
					
				 }else{
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