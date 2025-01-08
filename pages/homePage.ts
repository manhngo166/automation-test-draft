import { type Page, type Locator } from "@playwright/test";

class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getHeaderElement(): Locator {
    return this.page.locator("header");
  }

  getLogoHeaderLink(): Locator {
    return this.getHeaderElement().locator("a");
  }

  getToggleDarkThemeButton(): Locator {
    return this.page.locator('button[aria-label="Toggle dark mode"]');
  }

  getFooterElement(): Locator {
    return this.page.locator(".w-full.container.max-w-6xl.px-5.self-center");
  }

  getLogoFooterLink(): Locator {
    return this.getFooterElement().locator("a");
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentTheme(): Promise<string> {
    return await this.page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "color-scheme"
      )
    );
  }

  getLoadMoreButton(): Locator {
    return this.page.locator("button", { hasText: "Load more" });
  }
}

export default HomePage;
