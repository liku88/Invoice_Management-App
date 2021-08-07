package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import com.google.gson.Gson;


@WebServlet("/FetchData")
public class FetchData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 //	Database URL and credentials
       private static String url = "jdbc:mysql://127.0.0.1:3306/hrcsummerintern";
       private static String username = "root";
       private static String password = "Likumama@88";
  
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//List containing HashMap
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();
		try {
			
			//These are the variables that we need from client side
			Integer start = Integer.parseInt(request.getParameter("start"));
			Integer limit = Integer.parseInt(request.getParameter("limit"));
			
			// Registering JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			
			// Creating connection
			Connection con = DriverManager.getConnection(url, username, password);
			
			//Prepared Statement and query execution
			PreparedStatement ps = con.prepareStatement("select id, name_customer, cust_number, invoice_id, total_open_amount, due_in_date, predicted_clear_date from mytable where dlt_sub=0 LIMIT ?,?");
			ps.setInt(1, start);
			ps.setInt(2,  limit);
			ResultSet rs = ps.executeQuery();
			
			//Looping ResultSet for putting data in HashMap
			while(rs.next()) {
				HashMap<String, Object> row = new HashMap<String, Object>();
				row.put("id", rs.getInt(1));
				row.put("name_customer", rs.getString(2));
				row.put("cust_number", rs.getString(3));
				row.put("invoice_id", rs.getDouble(4));
				row.put("total_open_amount", rs.getDouble(5));
				row.put("due_in_date", rs.getDate(6));
				row.put("predicted_clear_date", rs.getDate(7));
				
				//Now adding HashMap in list
				result.add(row);
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		Gson gson = new Gson(); 
		response.getWriter().print(gson.toJson(result));
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}
	
	

}
