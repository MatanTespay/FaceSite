package coreservlets;


import java.util.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;



import java.net.URISyntaxException;
import java.net.URL;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class UserDAO {
	
	public UserDAO() {
		// TODO Auto-generated constructor stub
	}
	
	private boolean validateUser(String fileName, String userName, String pass) {
		boolean isValid = false;
		try {
			URL u = getClass().getResource("../../WebContent/Js/" + fileName + "");
			
			
			// read the json file
			File file = new File(u.toURI());
			
			FileReader reader = new FileReader(file);

			JSONParser jsonParser = new JSONParser();

			JSONObject jsonRootObject = (JSONObject) jsonParser.parse(reader);

			String firstName = null;

			String password = null;

			// get an users array from the JSON object
			JSONArray users = (JSONArray) jsonRootObject.get("users");

			Iterator<JSONObject> i = users.iterator();

			// take each value from the json array separately
			while (i.hasNext()) {
				JSONObject user = i.next();
				firstName = user.get("fname").toString();
				password = user.get("password").toString();

				System.out.println("\nname: " + firstName + " pass: "
						+ password);
			}

		} catch (FileNotFoundException ex) {
			ex.printStackTrace();
		} catch (IOException ex) {
			ex.printStackTrace();
		} catch (NullPointerException ex) {
			ex.printStackTrace();
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return false;

	}

	public UserBean login(UserBean bean) {

		String username = bean.getUsername();
		String password = bean.getPassword();

		bean.setValid(validateUser("users.js", "Moomin", "1234"));

		return bean;

	}
}
