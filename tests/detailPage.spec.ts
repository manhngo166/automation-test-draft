import { test, expect } from "@playwright/test";
import DetailPage from "~/pages/detailPage";

const examplePage =
  "/post/the-impact-of-technology-on-the-workplace-how-technology-is-changing-1734887716925";

let detailPage: DetailPage;
test.beforeEach(async ({ page }) => {
  detailPage = new DetailPage(page);
  await page.goto(examplePage);
});

async function countComments() {
  const response = await detailPage.page.waitForResponse(
    (response) =>
      response.url().includes("api/comment/get-all-comment-blog") &&
      response.status() === 200
  );
  return (await response.json()).data.data.length;
}

test("Detail: Comment should be successful", async () => {
  const beforeCommentCount = await countComments();
  const textAreaElement = detailPage.getTextAreaElement();
  const submitButtonCommentElement = detailPage.getButtonSubmitCommentElement();
  const comment = `att abcxyz ${new Date().getTime()}`;
  textAreaElement.fill(comment);
  submitButtonCommentElement.click();
  const afterCommentCount = await countComments();
  expect(afterCommentCount).toBeGreaterThan(beforeCommentCount);
  const latestComment = await detailPage.getLatestComment();
  expect(latestComment).toBe(comment);
});
