import { createConsola } from "consola";

export const loggerF = createConsola({
  formatOptions: {
    date: true,
  },
}).withTag("frontend");
