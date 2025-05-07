import { test, expect } from "@playwright/test";

test.describe("Login test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.getByTestId("login-button").click();
  });

  test("should display the login form", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("should show error message for invalid credentials", async ({
    page,
  }) => {
    await page.getByTestId("email-field").fill("invalidUser");
    await page.getByTestId("password-field").fill("invalidPass");
    await page.getByTestId("confirm-button").click();

    await expect(page.getByTestId("error-message")).toContainText(
      "Email ou senha inválidos. Por favor, tente novamente."
    );
  });

  test("should log in and log out successfully", async ({ page }) => {
    await page.getByTestId("email-field").fill("teste@teste.com");
    await page.getByTestId("password-field").fill("teste123");
    await page.getByTestId("confirm-button").click();

    await expect(page.getByTestId("login-form")).toHaveCount(0); // form disappears
    await expect(page.getByTestId("display-name")).toContainText("Grilha");

    await page.getByTestId("logout-button").click();
    await expect(page.getByTestId("login-button")).toBeVisible();
  });
});
