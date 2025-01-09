import { expect, test } from "@playwright/test";
import BasePage from "~/pages/basePage";
import { ETheme } from "~/constants";

let basePage: BasePage;
test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  await page.goto("/");
});

const themeMap: Record<string, string> = {
  dark: "light",
  light: "dark",
};

const toggleTheme = async (): Promise<void> => {
  const currentTheme = await basePage.getTheme();
  if (!currentTheme) throw Error("Theme is null or undefined");

  const expectedTheme = themeMap[currentTheme];

  await basePage.getToggleDarkThemeButton().click();
  const newTheme = await basePage.getTheme();
  expect(newTheme).toBe(expectedTheme);
};

/*  --- Start header --- */
test("Base: Should header is visible", async () => {
  const isHeaderVisible = await basePage.getHeaderElement().isVisible();
  expect(isHeaderVisible).toBe(true);
});

test("Base: Should navigate to homepage when click logo header", async () => {
  await basePage.getLogoHeaderLink().click();
  const currentPath = new URL(basePage.getUrl()).pathname;
  expect(currentPath).toBe("/");
});

test("Base: toggle theme (Browser is light mode)", async () => {
  await basePage.useTheme(ETheme.light);
  await toggleTheme();
  await toggleTheme();
});

test("Base: toggle theme (Browser is dark mode)", async () => {
  await basePage.useTheme(ETheme.dark);
  await toggleTheme();
  await toggleTheme();
});
/*  --- End header --- */

/* --- Start footer --- */
test("Base: Should footer is visible", async () => {
  const isFooterVisible = await basePage.getFooterElement().isVisible();
  expect(isFooterVisible).toBe(true);
});

test("Should navigate to homepage when click logo footer", async () => {
  await basePage.getLogoFooterLink().click();
  const currentPath = new URL(basePage.getUrl()).pathname;
  expect(currentPath).toBe("/");
});
/* --- End footer --- */
