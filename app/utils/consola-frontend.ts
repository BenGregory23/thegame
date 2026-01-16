import { Logger } from "tslog";

export const loggerF = new Logger({
  prettyLogTemplate:
    "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} [{{logLevelName}}] ",
  prettyErrorTemplate:
    "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} [{{logLevelName}}] {{errorName}} - {{errorMessage}}",
  prettyErrorStackTemplate: "  at {{filePathWithLine}}",
});
