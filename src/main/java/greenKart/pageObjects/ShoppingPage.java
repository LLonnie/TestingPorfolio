package greenKart.pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

public class ShoppingPage {

	WebDriver driver;

	public ShoppingPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	/*
		Methods
	 */
	public void searchForItem(String itemName) {
		searchInput.sendKeys(itemName);
	}

	public List<WebElement> getItemNames() {
		return productNames;
	}

	public ArrayList<String> getItemNamesAsString() {
		ArrayList<String> names = new ArrayList<>();
		for (WebElement productName: productNames) {
			names.add(productName.getText().split("-")[0].trim());
		}
		return names;
	}



	/*
		Web Elements
	 */
	private @FindBy(css = ".greenLogo")
		WebElement logo;

	private @FindBy(className = "search-keyword")
		WebElement searchInput;

	private @FindBy(className = "no-results")
		WebElement failedSearchMessage;

	private @FindBy(linkText = "Top Deals")
		WebElement topDealsLink;

	private @FindBy(linkText = "Flight Booking")
		WebElement flightBookingLink;

	private @FindBy(linkText = "Free Access to InterviewQues/ResumeAssistance/Material")
		WebElement limitedOfferLink;

	private @FindBy(className = "product")
		List<WebElement> products;

	private @FindBy(css = "h4.product-name")
		List<WebElement> productNames;

	private @FindBy(className = "product-price")
		List<WebElement> productPrices;

	private @FindBy(xpath = "//a[@class='decrement']")
		List<WebElement> productDecreaseQuantityButton;

	private @FindBy(xpath = "//a[@class='increment']")
		List<WebElement> productIncreaseQuantityButton;

	private @FindBy(xpath = "//input[@class='quantity']")
		List<WebElement> productQuantityInput;

	private @FindBy(css = ".product-action button")
		List<WebElement> addToCartButton;

	private @FindBy(css = ".cart-info table tbody tr:nth-child(1) td:nth-child(3)")
		WebElement cartSummaryItemsCount;

	private @FindBy(css = ".cart-info table tbody tr:nth-child(2) td:nth-child(3)")
		WebElement cartSummaryPrice;

	private @FindBy(className = "cart-icon")
		WebElement cartLink;

	private @FindBy(css = ".empty-cart h2")
		WebElement emptyCartMessage;

	private @FindBy(xpath = "//div[@class='cart-preview active']/div[@class='action-block']/button")
		WebElement proceedToCheckoutButton;

	private @FindBy(css = ".cart-item")
		List<WebElement> cartItems;

	private @FindBy(css = ".cart-item .product-name")
		List<WebElement> cartItemNames;

	private @FindBy(css = ".cart-item .product-price")
		List<WebElement> cartItemPrices;

	private @FindBy(css = ".cart-item .quantity")
		List<WebElement> cartItemQuantity;

	private @FindBy(css = ".cart-item .amount")
		List<WebElement> cartItemTotalPrice;

	private @FindBy(css = ".cart-item .product-remove")
		List<WebElement> removeFromCartButton;
}
