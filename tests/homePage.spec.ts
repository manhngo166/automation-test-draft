import { expect, test } from "@playwright/test";
import { PAGE_TITLE } from "~/constants";
import HomePage from "~/pages/homePage";

let homePage: HomePage;
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await page.goto("/");
});

test(`Home: title should be ${PAGE_TITLE}`, async () => {
  const pageTitle = await homePage.getPageTitle();
  expect(pageTitle).toBe(PAGE_TITLE);
});

test("Home: Should disappeared load more button when clicked", async () => {
  await homePage.getLoadMoreButton().click();
  const isLoadMoreBtnVisible = await homePage.getLoadMoreButton().isVisible();
  expect(isLoadMoreBtnVisible).toBe(false);
});

test("Home: Should be match overview post and detail info", async ({
  page,
}) => {
  const getOverviewPostElement = await homePage.getOverviewPostElement();
  const dataBeforeClick = await homePage.getOverviewPostData();
  const link = getOverviewPostElement.locator(
    "div .p-8.text-white.flex.flex-col.self-end.w-full a"
  );
  await Promise.all([homePage.waitForNavigation(), link.click()]);

  // Detail Page is here ......
  // const titlePageAfterClick = await page.title();
  // expect(titlePageAfterClick).toBe(`${dataBeforeClick.title} - ${PAGE_TITLE}`);
  // const informationElement = page.locator(
  //   ".flex.flex-col.items-center.justify-center"
  // );
  // const titleAfterClick = informationElement.locator(
  //   ".mt-3.font-semibold.md\\:text-5xl.text-center.text-4xl"
  // );
  // console.log("title: ", await titleAfterClick.textContent());
  // const dataAfterClick = {
  //   title: titleAfterClick,
  // };
});
