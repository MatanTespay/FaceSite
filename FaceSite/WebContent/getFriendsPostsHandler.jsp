<%@page import="coreservlets.UserDAO"%>
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
			
			//System.out.print(userName + "\n");
			
			JSONArray data = new JSONArray();
			
			PreparedStatement ps;
			ps = con.getConnection().prepareStatement(q.getFriendsPosts);
			ResultSet rs;
			
			ps.setString(1, userName); // ignore the user from th list in users
			ps.setString(2, userName); // <<added this
			
			rs = ps.executeQuery();
			 
			/* JSONObject a = new JSONObject();*/
			/*a.put("FullName","Matan Tespay");
			a.put("profilePic", "profile1.png");
			a.put("postId","1");
			a.put("date","01/01/2016");
			a.put("content","Test Test Test Test Test Test Test Test Test");
			a.put("author","Me !!!!!!!!");
			data.add(a); */
			
			
			 while(rs.next()){
				JSONObject post = new JSONObject();
				post.put("FullName",rs.getString(1));
				post.put("profilePic", rs.getString(2));
				post.put("postId",rs.getInt(3));
				post.put("date", rs.getString(4) );
				post.put("content",rs.getString(5));
				post.put("author",rs.getString(6));
				
				data.add(post);
				
				
			} 
			
			
			//System.out.print(data + "\n");	
			
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