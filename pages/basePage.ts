import { Locator, Page } from "@playwright/test";
import { ETheme } from "~/constants";
import CorePage from "./core";

class BasePage extends CorePage {
  constructor(page: Page) {
    super(page);
  }

  public async useTheme(theme: ETheme) {
    await this.page.emulateMedia({ colorScheme: theme });
  }

  public getHeaderElement(): Locator {
    return this.page.locator("header");
  }

  public getLogoHeaderLink(): Locator {
    return this.getHeaderElement().locator("a");
  }

  public getToggleDarkThemeButton(): Locator {
    return this.page.locator('button[aria-label="Toggle dark mode"]');
  }

  public getFooterElement(): Locator {
    return this.page.locator(".w-full.container.max-w-6xl.px-5.self-center");
  }

  public getLogoFooterLink(): Locator {
    return this.getFooterElement().locator("a");
  }

  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  public async getTheme(): Promise<string> {
    return await this.page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "color-scheme"
      )
    );
  }
}

export default BasePage;
