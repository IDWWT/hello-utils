import java.net.HttpURLConnection;
import java.net.URL;

public class HttpHealthCheckUtility {
  public static void main(String[] args) {
    if (args.length != 1) {
      System.out.println("Usage: java HttpHealthCheckUtility <URL>");
      return;
    }

    String url = args[0];

    try {
      URL healthCheckUrl = new URL(url);
      HttpURLConnection connection = (HttpURLConnection) healthCheckUrl.openConnection();
      connection.setRequestMethod("GET");

      int responseCode = connection.getResponseCode();

      if (responseCode == HttpURLConnection.HTTP_OK) {
        System.out.println("HTTP health check successful. Server is UP.");
      } else {
        System.out.println("HTTP health check failed. Server is DOWN. Response Code: " + responseCode);
      }

      connection.disconnect();
    } catch (Exception e) {
      System.out.println("Error occurred during HTTP health check: " + e.getMessage());
    }
  }
}
