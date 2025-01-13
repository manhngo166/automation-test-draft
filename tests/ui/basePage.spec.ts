import { expect, test } from '@playwright/test';
import BasePage from '~/pages/ui/basePage';
import { ETheme } from '~/constants';

const path = '/post/the-impact-of-technology-on-the-workplace-how-technology-is-changing-1734887716925';

let page: BasePage;
test.beforeEach(async ({ page: pageParam }) => {
  page = new BasePage(pageParam);
  await pageParam.goto(path);
});

const themeMap: Record<string, string> = {
  dark: 'light',
  light: 'dark',
};

test.describe('Header', () => {
  const toggleTheme = async (): Promise<void> => {
    const currentTheme = await page.getTheme();
    if (!currentTheme) throw Error('Theme is null or undefined');

    const expectedTheme = themeMap[currentTheme];

    await page.getToggleDarkThemeButton().click();
    const newTheme = await page.getTheme();
    expect(newTheme).toBe(expectedTheme);
  };

  test('Should header is visible', async () => {
    const isHeaderVisible = await page.headerElement.isVisible();
    expect(isHeaderVisible).toBe(true);
  });

  test('Should navigate to homepage when click logo', async () => {
    await page.getLogoHeaderLink().click();
    await page.waitForURL('/');
    const currentPath = page.getPathName();
    expect(currentPath).toBe('/');
  });

  test('toggle theme (Browser is light mode)', async () => {
    await page.useTheme(ETheme.light);
    await toggleTheme();
    await toggleTheme();
  });

  test('toggle theme (Browser is dark mode)', async () => {
    await page.useTheme(ETheme.dark);
    await toggleTheme();
    await toggleTheme();
  });
});

test.describe('Footer', () => {
  test('Should footer is visible', async () => {
    const isFooterVisible = await page.footerElement.isVisible();
    expect(isFooterVisible).toBe(true);
  });

  test('Should navigate to homepage when click logo', async () => {
    await page.getLogoFooterLink().click();
    await page.waitForURL('/');
    const currentPath = page.getPathName();
    expect(currentPath).toBe('/');
  });
});
