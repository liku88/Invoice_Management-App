package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Date;   
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/InsertData")
public class InsertData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
     // Database URL and credentials
	 private static String url = "jdbc:mysql://127.0.0.1:3306/hrcsummerintern";
     private static String username = "root";
     private static String password = "*********";



	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			//These are the variables that we need from client side
			String cust_number = request.getParameter("cust_number");
			String name_customer = request.getParameter("name_customer");
			Double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
	 		Double invoice_id = Double.parseDouble(request.getParameter("invoice_id"));
	 		
	 	    // Registering JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			
			// Creating connection
			Connection con = DriverManager.getConnection(url, username, password);
			
			//Prepared Statement and query execution
			PreparedStatement psInsert = con.prepareStatement("insert into mytable(cust_number,name_customer,total_open_amount,invoice_id,due_in_date,dlt_sub)values(?, ?, ?, ?, ?,0)");
			psInsert.setString(1, cust_number);
			psInsert.setString(2, name_customer);
			psInsert.setDouble(3, total_open_amount);
			psInsert.setDouble(4, invoice_id);
			psInsert.setDate(5, Date.valueOf(request.getParameter("due_in_date")));
			psInsert.executeUpdate();
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

}
