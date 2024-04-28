import { LodeStone } from "./lodestone/lodestone";
import { Login } from "./login/login";
(async () => {
  const login = new Login("aa", "password");
  const a = await LodeStone.init();
  await a.update();
})();
