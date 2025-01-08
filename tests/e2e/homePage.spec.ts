import { expect, test } from "@playwright/test";
import HomePage from "./homePage";

let homePage: HomePage;
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await page.goto("/");
});

test.describe("Home page is load successful", () => {
  test("Should page title is MyBlg", async () => {
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toBe("MyBlg");
  });
  test("Should header is visible", async () => {
    const isHeaderVisible = await homePage.getHeaderElement().isVisible();
    expect(isHeaderVisible).toBe(true);
  });
  test("Should footer is visible", async () => {
    const isFooterVisible = await homePage.getFooterElement().isVisible();
    expect(isFooterVisible).toBe(true);
  });
});

test.describe("Action in home page", () => {
  test("Should disappeared load more button when clicked", async () => {
    await homePage.getLoadMoreButton().click();
    const isLoadMoreBtnVisible = await homePage.getLoadMoreButton().isVisible();
    expect(isLoadMoreBtnVisible).toBe(false);
  });
});

/*  --- Start header --- */
test.describe("Action in header", () => {
  test("Should navigate to homepage when click logo header", async () => {
    await homePage.getLogoHeaderLink().click();
    const currentPath = new URL(homePage.page.url()).pathname;
    expect(currentPath).toBe("/");
  });

  test("Should toggle theme between dark and light", async () => {
    const themeMap: Record<string, string> = {
      dark: "light",
      light: "dark",
    };

    const toggleTheme = async (): Promise<void> => {
      const currentTheme = await homePage.getCurrentTheme();
      if (!currentTheme) throw Error("Theme is null or undefined");

      const expectedTheme = themeMap[currentTheme];

      await homePage.getToggleDarkThemeButton().click();
      const newTheme = await homePage.getCurrentTheme();
      expect(newTheme).toBe(expectedTheme);
    };

    await toggleTheme();
    await toggleTheme();
  });
});
/*  --- End header --- */

/* --- Start footer --- */
test.describe("Action in footer", () => {
  test("Should navigate to homepage when click logo footer", async () => {
    await homePage.getLogoFooterLink().click();
    const currentPath = new URL(homePage.page.url()).pathname;
    expect(currentPath).toBe("/");
  });
});
/* --- End footer --- */
