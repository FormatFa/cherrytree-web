import { SqlJsStatic } from "sql.js";
import initSqlJs from "sql.js";
/**
 * sqlite singleton
 */
export default class SQLTool {
  private static sql: SqlJsStatic;
  public static async initSql(): Promise<void> {
    // load from / , sql-wasm.wasm should put in public directory
    this.sql = await initSqlJs({
      locateFile: (file) => `/${file}`,
    });
  }
  public static async initSql2(): Promise<void> {
    this.sql = await initSqlJs();
  }
  public static getSQL(): SqlJsStatic {
    if (this.sql == null) {
      // throw new Error("sql init fail");
    }
    return this.sql;
  }
}
