import { Input } from "./input";
import { LodeStone } from "./lodestone";

(async () => {
  const blog_url = await Input.input("日記のURL\n");
  //後にエラー処理
  const blog = await LodeStone.init();
  await blog.update(blog_url);
})();
