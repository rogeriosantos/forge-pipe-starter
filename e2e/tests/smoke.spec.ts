import { test, expect } from "@playwright/test"

const SEED_EMAIL = "demo@forge-pipe.dev"
const SEED_PASSWORD = "demo1234"

test.describe.configure({ mode: "serial" })

test("smoke: login → CRUD → logout", async ({ page }) => {
  await page.goto("/login")
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible()

  await page.getByLabel("Email").fill(SEED_EMAIL)
  await page.getByLabel("Password").fill(SEED_PASSWORD)
  await page.getByRole("button", { name: "Sign in" }).click()

  await page.waitForURL("**/dashboard")
  await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible()

  await page.getByRole("link", { name: "Items" }).first().click()
  await page.waitForURL("**/items")
  await expect(page.getByRole("heading", { name: "Items" })).toBeVisible()

  const stamp = Date.now()
  const title = `Smoke item ${stamp}`
  const updatedTitle = `${title} updated`

  await page.getByRole("link", { name: /new item/i }).first().click()
  await page.waitForURL("**/items/new")
  await page.getByLabel("Title").fill(title)
  await page.getByLabel("Description").fill("Created during smoke test")
  await page.getByRole("button", { name: "Create item" }).click()

  await page.waitForURL("**/items")
  await expect(page.getByRole("link", { name: title })).toBeVisible()

  await page.getByRole("link", { name: title }).click()
  await page.waitForURL(/\/items\/[0-9a-f-]+\/edit/)
  await page.getByLabel("Title").fill(updatedTitle)
  await page.getByRole("button", { name: "Save changes" }).click()

  await page.waitForURL("**/items")
  await expect(page.getByRole("link", { name: updatedTitle })).toBeVisible()

  await page.getByRole("button", { name: `Actions for ${updatedTitle}` }).click()
  await page.getByRole("menuitem", { name: "Delete" }).click()
  await page.getByRole("button", { name: "Delete", exact: true }).click()
  await expect(page.getByRole("link", { name: updatedTitle })).toHaveCount(0)

  await page.getByRole("button", { name: "User menu" }).click()
  await page.getByRole("menuitem", { name: "Sign out" }).click()
  await page.waitForURL("**/login")
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible()
})
