import { type Page, type Locator } from "@playwright/test";
import CorePage from "./core";

class DetailPage extends CorePage {
  constructor(page: Page) {
    super(page);
  }

  private getDetailPageElement(): Locator {
    return this.page.locator("header~div");
  }

  getTextAreaElement(): Locator {
    return this.getDetailPageElement().locator("textarea");
  }

  getButtonSubmitCommentElement(): Locator {
    return this.getDetailPageElement().locator("button");
  }

  async getLatestComment(): Promise<string> {
    return await this.getDetailPageElement()
      .locator(".flex.flex-col.gap-2")
      .first()
      .locator(".ml-12")
      .textContent();
  }
}

export default DetailPage;
