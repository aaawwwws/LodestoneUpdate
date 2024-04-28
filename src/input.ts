import * as readline from "readline/promises";
export class Input {
  constructor() {}
  public static input = async (print: string) => {
    const readInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    let string = await readInterface.question(print);
    readInterface.close();
    return string;
  };
}
