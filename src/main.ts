import { LodeStone } from "./lodestone";
(async () => {
  const a = await LodeStone.init();
  await a.update();
})();
