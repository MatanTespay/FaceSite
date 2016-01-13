<%@ page language="java" contentType="text/html; charset=windows-1255"
    pageEncoding="windows-1255"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1255">
<title>Insert title here</title>
</head>
<body>
<%@ page import="java.util.*" %>
<%@ page import="javax.sql.*" %>
<%@page import="java.sql.*"%>
<%@page import="com.mysql.*"%>
<%@ page import="coreservlets.MyConnection" %>


<% 
	coreservlets.MyConnection con = new coreservlets.MyConnection();
	session.setAttribute("connection", con.getConnection());

	%>
</body>
</html>