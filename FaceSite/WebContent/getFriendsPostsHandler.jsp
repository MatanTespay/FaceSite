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
			String existingpost = request.getParameter("postIds");
			
			//System.out.print(userName + "\n");
			
			JSONArray data = new JSONArray();
			
			PreparedStatement ps;
			
			//get all friends posts
			if(existingpost == null){
				ps = con.getConnection().prepareStatement(q.getFriendsPosts);
				ps.setString(1, userName); // ignore the user from th list in users
				ps.setString(2, userName); // <<added this
				
			}else{
				//get only new post
				ps = con.getConnection().prepareStatement(q.getNewPosts);
				ps.setString(1, userName); // ignore the user from th list in users
				ps.setString(2, userName); // <<added this
				ps.setString(3, existingpost); // the ids of the existing posts in DB
			}
			
			
			ResultSet rs;
			
			
			
			rs = ps.executeQuery();
			 		
			
			
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