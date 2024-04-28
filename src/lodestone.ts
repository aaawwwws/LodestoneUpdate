import { chromium } from "@playwright/test";
import { Blog } from "./blog";
import * as fs from "fs";
export class LodeStone {
  constructor() {}
  public static init = async (): Promise<Blog> => {
    const DATA_FILE = "./data.json";
    const LOGIN_PAGE = "https://jp.finalfantasyxiv.com/lodestone/my/";
    const browse = await chromium.launch({ headless: false });
    const UA =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    const context = fs.existsSync(DATA_FILE)
      ? await browse.newContext({
          storageState: DATA_FILE,
          userAgent: UA,
        })
      : await browse.newContext({ userAgent: UA });
    const page = await context.newPage();
    await page.goto(LOGIN_PAGE);
    return new Blog(browse, context, page, DATA_FILE);
  };
}
