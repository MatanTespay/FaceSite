package coreservlets;

public class Queries {
	
	
	public String getAllUsers = "(SELECT  CONCAT(u.firstName, ' ', u.lastName) as 'FullName',u.username, 'Friends' as 'Category' "
			+ " from facebookdb.tbluser as u INNER JOIN tblfriend AS f ON u.username = f.secondUser "
			+ " where  u.firstName  like ? and f.firstUser = ?) Union "
			+ " select CONCAT(u.firstName, ' ', u.lastName) as 'FullName',u.username, 'Others' as 'Category' " 
			+ " from  facebookdb.tbluser as u where u.username like ? and (u.username != ?) "
			+ " and u.username Not in (select f.secondUser from tblfriend as f where f.firstUser = ?) ";
	
	public String insertFriednd = "INSERT INTO tblfriend  VALUES (?,?)";
	
	public String getOnLineFriends = "(SELECT  CONCAT(u.firstName, ' ', u.lastName) as 'FullName',u.username,u.isOnline "
			+ " from facebookdb.tbluser as u INNER JOIN tblfriend AS f ON u.username = f.secondUser "
			+ " where  f.firstUser = ?)";

}
