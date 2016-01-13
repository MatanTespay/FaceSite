package coreservlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class FindUser
 */
@WebServlet("/FindUser")
public class FindUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FindUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if(session!=null)
		{
			MyConnection con = (MyConnection)session.getAttribute("connection");
			PrintWriter out = response.getWriter();
			
			String user = request.getParameter("user");
			String pwd = request.getParameter("password");
			
			try {
				PreparedStatement ps = null;
				ResultSet rs;
				String query = "SELECT *\n" +
						"FROM tbluser \n" +
						"WHERE username = ?";
				ps=con.getConnection().prepareStatement(query);
				ps.setString(1, user);
				ps.setString(2, pwd);
			    rs = ps.executeQuery();
			    if(rs.next())
			    	write(response,"exist"); 
			    else
			    	write(response,"not exist"); 
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    
		}
		
	}
	
	private void write(HttpServletResponse res, String content) throws IOException{
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.getWriter().write(content);
	}

}
