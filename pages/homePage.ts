import { type Page, type Locator } from "@playwright/test";
import CorePage from "./core";

interface Post {
  title: string;
  writtenBy: string;
  publishedOn: string;
  fileUnder: string;
}

class HomePage extends CorePage {
  constructor(page: Page) {
    super(page);
  }

  public async getOverviewPostElement(): Promise<Locator> {
    await this.page.waitForSelector(
      ".container.mx-auto.flex.flex-col.max-w-6xl.px-4.md\\:px-6 > .relative > img"
    );
    return this.page.locator(
      ".container.mx-auto.flex.flex-col.max-w-6xl.px-4.md\\:px-6 > .relative"
    );
  }

  public async getOverviewPostData(): Promise<Post> {
    const overViewElement = await this.getOverviewPostElement();

    const title =
      (await overViewElement
        .locator(".text-2xl.font-semibold.mb-2")
        .textContent()) || "";
    const writtenBy =
      (await overViewElement
        .locator("span", { hasText: "Written by" })
        .locator("~div .text-sm.font-semibold")
        .textContent()) || "";
    const publishedOn =
      (await overViewElement
        .locator("span", {
          hasText: "Published on",
        })
        .locator("~span")
        .textContent()) || "";
    const fileUnder =
      (await overViewElement
        .locator("span", {
          hasText: "File under",
        })
        .locator("~div .inline-flex.items-center.rounded-full")
        .textContent()) || "";

    return { title, writtenBy, publishedOn, fileUnder };
  }

  public getLoadMoreButton(): Locator {
    return this.page.locator("button", { hasText: "Load more" });
  }
}

export default HomePage;
