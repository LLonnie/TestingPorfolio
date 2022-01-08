package greenKart;

import greenKart.pageObjects.ShoppingPage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.io.IOException;

import static greenKart.TestSetup.getConfigProperty;
import static greenKart.TestSetup.initiateDriver;

public class ShoppingPageTest {

	public static WebDriver driver;

	ShoppingPage shoppingPage;

	@BeforeSuite
	public void testSetup() throws IOException {
		driver = initiateDriver();
	}

	@BeforeTest
	public void navigateToPage() throws IOException {
		driver.get(getConfigProperty("baseUrl"));
	}

	@Test
	public void verifyCompanyLogoIsRenderedInHeader() {
		Assert.assertEquals(driver.findElement(By.cssSelector(".brand")).getText(), "GREENKART");
	}

	@Test
	public void VerifyProductListIsFilteredWhenSearchingForFullItemName() {
		String searchItem = "Brinjal";

		shoppingPage = new ShoppingPage(driver);
		shoppingPage.searchForItem(searchItem);

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfAllElements(shoppingPage.getItemNames()));

		Assert.assertTrue(shoppingPage.getItemNamesAsString().contains(searchItem));
		Assert.assertEquals(shoppingPage.getItemNamesAsString().size(), 1);
	}
}
