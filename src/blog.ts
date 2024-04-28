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
  public update = async (url: string) => {
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
      const login_button = await this.page.$("div.view-loginArea");

      if (login_button == null) {
        console.log("ボタンなし");
        return await Promise.reject(new Error("タグがない"));
      }

      await login_button.click();
    }

    await this.page.goto(url);
    const edit_btn = await this.page.$("a.btn__radius__mini");

    if (edit_btn == null) {
      console.log("ボタンなし");
      return await Promise.reject(new Error("タグがない"));
    }
    //ここから日記編集ページ
    const UPDATE_TIMING = "input#publish_at_type01";
    await edit_btn.click();
    await this.page.locator(UPDATE_TIMING).first().waitFor();
    const update_btn = await this.page.$(UPDATE_TIMING); //投稿タイミングの日時を反映のボタン

    if (update_btn == null) {
      console.log("ボタンなし");
      return await Promise.reject(new Error("タグがない"));
    }
    await update_btn.click();
    const btn_list = await this.page.$$("li.form__submit");
    await btn_list[0].click(); //1回目の確認
    //ここから確認ページ
    await this.page.locator("p.form__message--confirm").waitFor();
    const btn_list1 = await this.page.$$("li.form__submit");
    await btn_list1[0].click(); //投稿ボタンクリック
    await this.page.locator("p.form__message--confirm").waitFor(); //ここから投稿できたか確認
    const check = "div.done_area_inline > p.parts__text";
    await this.page.locator("div.done_area_inline > p.parts__text").waitFor();
    const chinko = await this.page.$(check);
    if (chinko == null) {
      console.log("ボタンなし");
      return await Promise.reject(new Error("タグがない"));
    }
    if (
      (await chinko.textContent()) ==
      "日記の編集が完了しました。\n下書きの場合は他人から閲覧されることはありません。"
    ) {
      console.log("成功");
    } else {
      return await Promise.reject(new Error("この世の終わり"));
    }
    await this.context.storageState({ path: this.path });
    await this.context.close();
    await this.browser.close();
  };
}
