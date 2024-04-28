import { Input } from "./input";
import { LodeStone } from "./lodestone";
(async () => {
  const blog_url = await Input.input("日記のURL\n");
  //後にエラー処理
  const a = await LodeStone.init();
  await a.update(blog_url);
})();
