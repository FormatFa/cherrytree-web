import VConsole from "vconsole";

export class VConsoleTool {
  private static console: VConsole;
  public static getVConsole(): VConsole {
    if (VConsoleTool.console == null) {
      VConsoleTool.console = new VConsole();
    }
    return VConsoleTool.console;
  }
}
