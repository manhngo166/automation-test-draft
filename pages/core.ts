import { Page } from "@playwright/test";

class CorePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getUrl() {
    return this.page.url();
  }

  public async waitForNavigation(): Promise<any> {
    return await this.page.waitForNavigation();
  }

  async go(url: string) {
    return await this.page.goto(url);
  }

  public async pause() {
    return this.page.pause();
  }

  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}

export default CorePage;
