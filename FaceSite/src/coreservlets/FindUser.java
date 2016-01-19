package coreservlets;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

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
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		try {
			if (session != null) {
				MyConnection con ;
				
				if (session.getAttribute("connection") != null) {
					con = (coreservlets.MyConnection) session
							.getAttribute("connection");
				} else {
					con = new MyConnection();
					session.setAttribute("connection", con);
				}

				// PrintWriter out = response.getWriter(); OK!!!!!

				String user = request.getParameter("userRegister");
				System.out.println(user); // check user from client

				boolean isExist = false;
				PreparedStatement ps = null;
				ResultSet rs;
				String query = "SELECT *\n" + "FROM tbluser \n"
						+ "WHERE username = ?";
				ps = con.getConnection().prepareStatement(query);
				ps.setString(1, user);
				rs = ps.executeQuery();
				Map<String, Object> map = new HashMap<String, Object>();
				if (rs.next())
					isExist = true;
				else
					isExist = false;
				map.put("isExist", isExist);
				write(response, map);
				System.out.println("Exist? " + isExist);
				ps.close();

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private void write(HttpServletResponse res, Map<String, Object> content)
			throws IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.getWriter().write(new Gson().toJson(content));

	}

}
