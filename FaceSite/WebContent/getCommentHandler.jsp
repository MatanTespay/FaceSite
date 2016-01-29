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

			String postid = request.getParameter("post");
			String existingCommentIds  = request.getParameter("CommentIds");
			JSONArray commentList = new JSONArray();
			
			PreparedStatement ps;
			
			if(existingCommentIds == null){
				ps = con.getConnection().prepareStatement(q.getComments);
				ps.setInt(1, Integer.parseInt(postid)); 
				
			}else{
				ps = con.getConnection().prepareStatement(q.getNewComments);
				ps.setInt(1, Integer.parseInt(postid)); 
				ps.setString(2, existingCommentIds); 
			}
			
			ResultSet rs;
			
			rs = ps.executeQuery();
						
			while(rs.next()){
				JSONObject comment = new JSONObject();
				comment.put("FirstName",rs.getString("firstName"));
				comment.put("LastName",rs.getString("lastName"));
				comment.put("content",rs.getString("content"));
				comment.put("pic",rs.getString("profilePic"));
				comment.put("commentId",rs.getString("commentId"));
				commentList.add(comment);
				
			}
		    	
			//System.out.print(usersList + "\n");
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(commentList);
			
		}
		catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
	}
%>