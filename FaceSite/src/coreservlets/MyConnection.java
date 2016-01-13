package coreservlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MyConnection {
	private Connection connection;
	private static final String url = "jdbc:mysql://localhost:3306/FacebookDB" ; 

	static{
		try {
			Class.forName("com.mysql.jdbc.Driver");  //register with DriverManager
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} 

	}
	
	public MyConnection() throws SQLException, Exception {
				
		connection = DriverManager.getConnection(url, "root", "1234");
	}


	public Connection getConnection() {
		//System.out.println(connection.toString());
		return connection;
	}


	public void setConnection(Connection connection) {
		this.connection = connection;
	}
	
	public void closeConnection() {
		try {
			connection.close();
			System.out.println("Connection closed!");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
