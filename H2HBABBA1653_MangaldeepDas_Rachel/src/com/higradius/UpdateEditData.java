package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/UpdateEditData")
public class UpdateEditData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
     //	Database URL and credentials
	 private static String url = "jdbc:mysql://127.0.0.1:3306/hrcsummerintern";
     private static String username = "root";
     private static String password = "Likumama@88";
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			//These are the variable that we need from client side
			Integer id = Integer.parseInt(request.getParameter("id"));
			Float total_open_amount = Float.parseFloat(request.getParameter("total_open_amount"));
	        
			// Registering JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			
			// Creating connection
			Connection con = DriverManager.getConnection(url, username, password);
			PreparedStatement ps = con.prepareStatement("update mytable set total_open_amount = ? where id = ?");
			ps.setFloat(1, total_open_amount);
			ps.setInt(2,  id);
			ps.executeUpdate();
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}
