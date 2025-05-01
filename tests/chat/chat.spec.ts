import { test, expect, BrowserContext, Page } from "@playwright/test";

test.describe("Multi-user chat room test", () => {
  const user1 = {
    email: "teste@teste.com",
    password: "teste123",
    displayName: "Grilha",
  };
  const user2 = {
    email: "teste@hotmail.com",
    password: "teste1234",
    displayName: "Valbim",
  };
  const roomName = "test-room";

  let context1: BrowserContext;
  let context2: BrowserContext;
  let page1: Page;
  let page2: Page;

  test.beforeAll(async ({ browser }) => {
    context1 = await browser.newContext();
    context2 = await browser.newContext();
    page1 = await context1.newPage();
    page2 = await context2.newPage();
  });

  test.afterAll(async () => {
    await context1.close();
    await context2.close();
  });

  test("Visits the chat page", async ({ page }) => {
    await page.goto("/chat");
    await expect(page).toHaveURL(/\/chat/);
    await expect(page.locator("#tableTitle")).toContainText("Salas de Chat");
  });

  test("User cannot access chat room without logging in", async ({ page }) => {
    await page.goto("/chat");
    await expect(page.getByTestId("unauthenticated-message")).toContainText(
      "Você precisa estar logado para acessar as salas de chat."
    );
  });

  test("Full multi-user chat room flow", async () => {
    await test.step("Users 1 and 2 log in and see empty room list", async () => {
      await login(page1, user1);
      await login(page2, user2);

      await page1.goto("/chat");
      await page2.goto("/chat");

      await expect(page1.getByTestId("no-rooms-message")).toContainText(
        "Nenhuma sala de chat encontrada."
      );
      await expect(page2.getByTestId("no-rooms-message")).toContainText(
        "Nenhuma sala de chat encontrada."
      );
    });

    await test.step("User 1 creates a room", async () => {
      await page1.goto("/chat");
      await page1.getByTestId("create-room-button").click();
      await page1.getByTestId("room-name-input").fill(roomName);
      await page1.getByTestId("confirm-create-room").click();

      await expect(page1).toHaveURL(/\/chat\/[0-9a-fA-F-]{36}/);
    });

    await test.step("User 2 sees the room", async () => {
      // await page2.reload(); // if needed to refresh list
      await expect(page2.getByTestId(`room-${roomName}`)).toBeVisible();
    });

    await test.step("Both users enter the room", async () => {
      await page2.getByTestId(`room-${roomName}`).click();
      await expect(page2).toHaveURL(/\/chat\/[0-9a-fA-F-]{36}/);

      await expect(
        page1.getByTestId(`user-${user1.displayName}`)
      ).toBeVisible();
      await expect(
        page1.getByTestId(`user-${user2.displayName}`)
      ).toBeVisible();
      await expect(
        page2.getByTestId(`user-${user2.displayName}`)
      ).toBeVisible();
      await expect(
        page2.getByTestId(`user-${user1.displayName}`)
      ).toBeVisible();
    });

    await test.step("Both users send messages", async () => {
      await page1.getByTestId("chat-input").fill("Hello from User 1");
      await page1.getByTestId("chat-input").press("Enter");

      await page2.getByTestId("chat-input").fill("Hello from User 2");
      await page2.getByTestId("chat-input").press("Enter");
    });

    await test.step("Users see each other's messages", async () => {
      await expect(page1.getByText("Hello from User 2")).toBeVisible();
      await expect(page2.getByText("Hello from User 1")).toBeVisible();

      await expect(
        page1.getByTestId("messages-box").locator("text=Hello from User 2")
      ).toBeVisible();
      await expect(
        page2.getByTestId("messages-box").locator("text=Hello from User 1")
      ).toBeVisible();
    });

    await test.step("Both users leave the room", async () => {
      await page1.getByTestId("leave-room-button").click();
      await page2.goto("/");

      await expect(page1).toHaveURL(/\/chat/);
      await expect(page2).not.toHaveURL(/\/chat/);
    });

    await test.step("Verify the room doesn't exist anymore", async () => {
      await expect(page1.getByTestId(`room-${roomName}`)).not.toBeVisible();
    });

    await context1.close();
    await context2.close();
  });

  // Helper function
  async function login(
    page: Page,
    user: { email: string; password: string; displayName: string }
  ) {
    await page.goto("/");
    await page.getByTestId("login-button").click();
    await page.getByTestId("email-field").fill(user.email);
    await page.getByTestId("password-field").fill(user.password);
    await page.getByTestId("confirm-button").click();
    await expect(page.getByTestId("login-form")).toHaveCount(0);
    await expect(page.getByTestId("display-name")).toHaveText(user.displayName);
  }
});
