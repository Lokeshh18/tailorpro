import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    static String url = "jdbc:mysql://localhost:3306/tailorpro";
    static String user = "root";
    static String password = "YOUR_PASSWORD";


    public static Connection getConnection() {

        Connection con = null;

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            con = DriverManager.getConnection(
                    url,
                    user,
                    password
            );

            System.out.println("Database Connected");

        } 
        catch(Exception e) {

            e.printStackTrace();

        }

        return con;
    }
}