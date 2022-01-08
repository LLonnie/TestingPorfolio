package greenKart;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.Duration;
import java.util.Properties;

public class TestSetup {

	public static String getConfigProperty(String prop) throws IOException {
		Properties properties = new Properties();
		FileInputStream file = new FileInputStream("src/test/resources/SeleniumConfig.properties");
		properties.load(file);
		return properties.getProperty(prop);
	}

	public static WebDriver initiateDriver() throws IOException {
		WebDriverManager.chromedriver().driverVersion(getConfigProperty("chromeDriverVersion")).setup();
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
		driver.manage().window().maximize();
		return driver;
	}
}