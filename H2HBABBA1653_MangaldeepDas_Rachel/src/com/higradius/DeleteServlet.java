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

@WebServlet("/DeleteServlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
   //	Database URL and credentials
	 private static String url = "jdbc:mysql://127.0.0.1:3306/hrcsummerintern";
     private static String username = "root";
     private static String password = "Likumama@88";
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//These are the variable that we need from client side
			Integer id = Integer.parseInt(request.getParameter("id"));
			
           // Registering JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			
			// Creating connection
			Connection con = DriverManager.getConnection(url, username, password);
			
			//Prepared Statement and query execution
			PreparedStatement ps = con.prepareStatement("update mytable set dlt_sub = 1 where id = ?");
			ps.setInt(1, id);
			ps.executeUpdate();
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

}
