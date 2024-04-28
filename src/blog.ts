import { Page, Browser, BrowserContext } from "@playwright/test";
import { Login } from "./login";
import { Input } from "./input";

export class Blog {
  constructor(
    private browser: Browser,
    private context: BrowserContext,
    private page: Page,
    private path: string
  ) {}
  public update = async () => {
    const NO_LOGIN = "このページを表示するにはログインが必要です。";
    const login = await this.page.$("p.error__text");
    if (login == null) {
      return await Promise.reject(new Error("タグがない"));
    }
    if ((await login.textContent()) == NO_LOGIN) {
      //ログインしてない場合
      const button = await this.page.$(
        "div.ldst__window.ldst__error > a.btn__color.parts__space--reset"
      );
      if (button == null) {
        return await Promise.reject(new Error("タグがない"));
      }
      await button.click();
      await this.page.locator("p").first().waitFor();
      const id = await Input.input("ID入力\n");
      const password = await Input.input("Password入力\n");
      const user_data = new Login(id, password);
      await this.page.locator("input#sqexid").fill(user_data.username);
      await this.page.locator("input#password").fill(user_data.password);
      const bot_check = await this.page.$("div.g-recaptcha");
      if (bot_check == null) {
        console.log("ボタンなし");
        return await Promise.reject(new Error("タグがない"));
      }
      await bot_check.click();
    }
    await this.context.storageState({ path: this.path });
    await this.context.close();
    await this.browser.close();
  };
}
