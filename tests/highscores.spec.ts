import { test, expect } from "@playwright/test";

let userPasswords = [
  {
    username: "chidi",
    password: "anagonye",
  },
  {
    username: "eleanor",
    password: "shellstrop",
  },
  {
    username: "jason",
    password: "mendoza",
  },
  {
    username: "tahani",
    password: "al-jamil",
  },
];

test.describe("Login page functionality", () => {
  test("test that home page has highscores in title and has a login button", async ({
    page,
  }) => {
    // Go to app
    await page.goto("http://localhost:5000/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Highscores/);

    // create a locator
    const login = page.locator("text=Login");

    // Expect an attribute "to be strictly equal" to the value.
    await expect(login).toHaveAttribute("id", "loginBtn");
  });

  test("Check that user can login and be directed to the dashboard page upon login - 0", async ({
    page,
  }) => {
    // Go to app
    await page.goto("http://localhost:5000/");
    // Fill [placeholder="Username"]

    await page
      .locator('[placeholder="Username"]')
      .fill(userPasswords[0].username);
    // Fill [placeholder="Password"]
    await page
      .locator('[placeholder="Password"]')
      .fill(userPasswords[0].password);
    // Click text=Login
    await page.locator("text=Login").click();
    await expect(page).toHaveURL("http://localhost:5000/dashboard");
  });

  test("Check that user can login and be directed to the dashboard page upon login- 1", async ({
    page,
  }) => {
    // Go to app
    await page.goto("http://localhost:5000/");

    // Fill [placeholder="Username"]
    await page
      .locator('[placeholder="Username"]')
      .fill(userPasswords[1].username);

    // Fill [placeholder="Password"]
    await page
      .locator('[placeholder="Password"]')
      .fill(userPasswords[1].password);

    // Click text=Login
    await page.locator("text=Login").click();
    await expect(page).toHaveURL("http://localhost:5000/dashboard");
  });

  test("Check that user can login, directed to the dashboard and logout - 2", async ({
    page,
  }) => {
    // Go to app
    await page.goto("http://localhost:5000/");

    // Fill [placeholder="Username"]
    await page
      .locator('[placeholder="Username"]')
      .fill(userPasswords[2].username);

    // Fill [placeholder="Password"]
    await page
      .locator('[placeholder="Password"]')
      .fill(userPasswords[2].password);

    // Click text=Login
    await page.locator("text=Login").click();
    await expect(page).toHaveURL("http://localhost:5000/dashboard");

    // Click text=Logout
    await page.locator("text=Logout").click();
    await expect(page).toHaveURL("http://localhost:5000/");
  });
});

test.describe("Dashboard testing and functionality", () => {
  test("Test that profile name is loaded in dashboard for the user that's logged in", async ({
    page,
  }) => {
    /* ===================
    Authorised step (req)
    =================== */
    // Go to app
    await page.goto("http://localhost:5000/");

    // Fill [placeholder="Username"]
    await page
      .locator('[placeholder="Username"]')
      .fill(userPasswords[2].username);

    // Fill [placeholder="Password"]
    await page
      .locator('[placeholder="Password"]')
      .fill(userPasswords[2].password);

    // Click text=Login
    await page.locator("text=Login").click();
    await expect(page).toHaveURL("http://localhost:5000/dashboard");

    // Go to dashboard
    await page.goto("http://localhost:5000/dashboard");

    // create a locator
    const user = page.locator(".authUser");

    // Expect an attribute "to be strictly equal" to the value.
    await expect(user).toHaveText(userPasswords[2].username.toUpperCase());
  });

  test("Test for the highscore form to be empty after submitting", async ({
    page,
  }) => {
    /* ===================
    Authorised step (req)
    =================== */
    // Go to app
    await page.goto("http://localhost:5000/");

    // Fill [placeholder="Username"]
    await page
      .locator('[placeholder="Username"]')
      .fill(userPasswords[2].username);

    // Fill [placeholder="Password"]
    await page
      .locator('[placeholder="Password"]')
      .fill(userPasswords[2].password);

    // Click text=Login
    await page.locator("text=Login").click();
    await expect(page).toHaveURL("http://localhost:5000/dashboard");

    // Go to dashboard
    await page.goto("http://localhost:5000/dashboard");

    /* ===================
    Dashboard
    =================== */
    // Fill [placeholder="Nickname"]
    await page.locator('[placeholder="Nickname"]').fill("Samuel");
    // Fill [placeholder="Score"]
    await page.locator('[placeholder="Score"]').fill("839");
    // Click input:has-text("Score")
    await page.locator('input:has-text("Score")').click();

    await expect(page.locator("#nickname")).toBeEmpty();
    await expect(page.locator("#score")).toBeEmpty();
  });

  test("Test for user input score into appended to the highscore list", async ({
    page,
  }) => {
    /* ===================
    Authorised step (req)
    =================== */
    // Go to app
    await page.goto("http://localhost:5000/");

    // Fill [placeholder="Username"]
    await page
      .locator('[placeholder="Username"]')
      .fill(userPasswords[2].username);

    // Fill [placeholder="Password"]
    await page
      .locator('[placeholder="Password"]')
      .fill(userPasswords[2].password);

    // Click text=Login
    await page.locator("text=Login").click();
    await expect(page).toHaveURL("http://localhost:5000/dashboard");

    // Go to dashboard
    await page.goto("http://localhost:5000/dashboard");

    /* ===================
    Test for appended list
    =================== */
    // Fill [placeholder="Nickname"]
    await page.locator('[placeholder="Nickname"]').fill("Jane");
    // Fill [placeholder="Score"]
    await page.locator('[placeholder="Score"]').fill("432");
    // Click input:has-text("Score")
    await page.locator('input:has-text("Score")').click();

    await page.reload();

    const listLength = await page.locator(".results");

    await expect(listLength).toContainText("Jane");
    await expect(listLength).toContainText("432");
  });
});
