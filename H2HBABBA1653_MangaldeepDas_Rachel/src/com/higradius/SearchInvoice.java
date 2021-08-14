package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


@WebServlet("/SearchInvoice")
public class SearchInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
      // Database URL and credentials
	  private static String url = "jdbc:mysql://127.0.0.1:3306/hrcsummerintern";
      private static String username = "root";
      private static String password = "*******";
 
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		//List containing HashMap
		List<HashMap<String, Object>> resultSearch = new ArrayList<HashMap<String, Object>>();
		try {
			//These are the variable that we need from client side
			Double invoice_id = Double.parseDouble(request.getParameter("invoice_id"));
	
			// Registering JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			
			// Creating connection
			Connection con = DriverManager.getConnection(url, username, password);
			
			//Prepared Statement and query execution
			PreparedStatement ps = con.prepareStatement("SELECT id, cust_number, name_customer, due_in_date, total_open_amount, invoice_id, predicted_clear_date FROM mytable WHERE invoice_id = ? AND dlt_sub = 0");
			ps.setDouble(1, invoice_id);
			ResultSet rs = ps.executeQuery();
			
			//Looping ResultSet for putting data in HashMap
			while(rs.next()) {
				HashMap<String, Object> row = new HashMap<String, Object>();
				row.put("id", rs.getInt(1));
				row.put("cust_number", rs.getString(2));
				row.put("name_customer", rs.getString(3));
				row.put("due_in_date", rs.getDate(4));
				row.put("total_open_amount", rs.getDouble(5));
				row.put("invoice_id", rs.getDouble(6));
				row.put("predicted_clear_date", rs.getDate(7));
				resultSearch.add(row);
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		Gson gson = new Gson(); 
		
		response.getWriter().print(gson.toJson(resultSearch));
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
