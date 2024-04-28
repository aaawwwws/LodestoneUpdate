import { Page, Browser, BrowserContext } from "@playwright/test";
import { Login } from "../login/login";

export class Blog {
  constructor(
    private browser: Browser,
    private context: BrowserContext,
    private page: Page,
    private path: string
  ) {}
  public update = async () => {
    const login = await this.page.$("ldst__window ldst__error");
    if (login == null) {
      return await Promise.reject(new Error("タグがない"));
    }
    const login_check = await login.textContent();
    console.log(login_check);
    await this.context.storageState({ path: this.path });
    await this.context.close();
    await this.browser.close();
  };
}
