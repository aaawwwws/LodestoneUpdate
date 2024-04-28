import { Page, Browser, BrowserContext } from "@playwright/test";
import { Login } from "./login";

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
      
    }
    await this.context.storageState({ path: this.path });
    await this.context.close();
    await this.browser.close();
  };
}
