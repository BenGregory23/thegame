import { Logger } from "tslog";
import { appendFileSync } from "fs";

export const loggerB = new Logger({
  prettyLogTemplate:
    "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} [{{logLevelName}}] ",
  prettyErrorTemplate:
    "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} [{{logLevelName}}] {{errorName}} - {{errorMessage}}",
  prettyErrorStackTemplate: "  at {{filePathWithLine}}",
});

loggerB.attachTransport((logObj) => {
  const { _meta, ...args } = logObj;

  const message = Object.keys(args)
    .sort()
    .map((key) => {
      const value = args[key];
      return typeof value === "object" ? JSON.stringify(value) : String(value);
    })
    .join(" ");

  const date = _meta.date.toISOString();
  const level = _meta.logLevelName;

  const line = `${date} [${level}] ${message}\n`;

  appendFileSync("logs.txt", line);
});
