package greenKart;

import greenKart.pageObjects.ShoppingPage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.ArrayList;

import static greenKart.TestSetup.getConfigProperty;
import static greenKart.TestSetup.initiateDriver;

public class ShoppingPageTest {

	public static WebDriver driver;

	ShoppingPage shoppingPage;

	@BeforeSuite
	public void testSetup() throws IOException {
		driver = initiateDriver();
	}

	@AfterSuite
	public void testCleanup() {
		driver.close();
	}

	@BeforeMethod
	public void navigateToPage() throws IOException {
		driver.get(getConfigProperty("baseUrl"));
	}

	@Test
	public void verifyCompanyLogoIsRenderedInHeader() {
		Assert.assertEquals(driver.findElement(By.cssSelector(".brand")).getText(), "GREENKART");
	}

	@Test
	public void verifyProductListIsFilteredWhenSearchingForFullItemName() {
		String searchItem = "Brinjal";

		shoppingPage = new ShoppingPage(driver);
		shoppingPage.searchForItem(searchItem);

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.refreshed(ExpectedConditions.visibilityOfAllElements(shoppingPage.getItemNames())));

		Assert.assertTrue(shoppingPage.getItemNamesAsString().contains(searchItem));
		Assert.assertEquals(shoppingPage.getItemNamesAsString().size(), 1);
	}

	@Test
	public void verifyProductListIsFilteredWhenSearchingUsingPartialString() {
		String searchItem = "Ber";

		shoppingPage = new ShoppingPage(driver);
		shoppingPage.searchForItem(searchItem);

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.refreshed(ExpectedConditions.visibilityOfAllElements(shoppingPage.getItemNames())));

		ArrayList<String> visibleItems = shoppingPage.getItemNamesAsString();
		Assert.assertEquals(visibleItems.size(), 3);
		for (String item: visibleItems) {
			Assert.assertTrue(item.contains(searchItem.toLowerCase()));
		}
	}

	@Test
	public void verifyCorrectErrorUponInvalidSearch() {
		String searchItem = "asdf";

		shoppingPage = new ShoppingPage(driver);
		shoppingPage.searchForItem(searchItem);

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.refreshed(ExpectedConditions.visibilityOfAllElements(shoppingPage.getSearchError())));

		Assert.assertTrue(shoppingPage.getSearchError().isDisplayed());
	}

	@Test
	public void verifyAllProductsDisplayedAfterClearingSearch() {
		String searchItem = "Ber";

		shoppingPage = new ShoppingPage(driver);
		shoppingPage.searchForItem(searchItem);

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.refreshed(ExpectedConditions.visibilityOfAllElements(shoppingPage.getItemNames())));

		Assert.assertEquals(shoppingPage.getItemNames().size(), 3);

		shoppingPage.clearSearchInput();

		wait.until(ExpectedConditions.refreshed(ExpectedConditions.visibilityOfAllElements(shoppingPage.getItemNames())));
		Assert.assertEquals(shoppingPage.getItemNames().size(), 30);
	}
}
