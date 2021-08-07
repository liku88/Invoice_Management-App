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


@WebServlet("/PopulateDataForEdit")
public class PopulateDataForEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
     //	Database URL and credentials
	 private static String url = "jdbc:mysql://127.0.0.1:3306/hrcsummerintern";
     private static String username = "root";
     private static String password = "Likumama@88";
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//List containing HashMap
		List<HashMap<String, Object>> resultEditPopulate = new ArrayList<HashMap<String, Object>>();
		try {
			
			//These are the variable that we need from client side
			Integer id = Integer.parseInt(request.getParameter("id"));
	        
			// Registering JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			
			// Creating connection
			Connection con = DriverManager.getConnection(url, username, password);
			
			//Prepared Statement and query execution
			PreparedStatement ps = con.prepareStatement("select total_open_amount from mytable where id = ? and dlt_sub = 0 ");
			ps.setInt(1,  id);
			ResultSet rs = ps.executeQuery();
			
			//Looping ResultSet for putting data in HashMap
			while(rs.next()) {
				HashMap<String, Object> row = new HashMap<String, Object>();
				row.put("total_open_amount", rs.getDouble(1));
				
				//Now adding HashMap in list
				resultEditPopulate.add(row);
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		Gson gson = new Gson(); 
		
		response.getWriter().print(gson.toJson(resultEditPopulate));
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
