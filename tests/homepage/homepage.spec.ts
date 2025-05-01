import { test, expect } from "@playwright/test";

test.describe("Homepage Test", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage and clear storage/cookies
    await page.goto("/");
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should display the navbar", async ({ page }) => {
    const logo = page.locator("#nav-logo");
    await expect(logo).toContainText("NerdBoard");
  });

  test("should show the title", async ({ page }) => {
    const title = page.locator('[data-testid="home-title"]');
    await expect(title).toContainText("Jogue com amigos online");
  });

  test("should navigate to chat page when chat icon is clicked", async ({
    page,
  }) => {
    await page.locator('[data-testid="chat-box"]').click();
    await expect(page).toHaveURL(/\/chat/);
  });
});
