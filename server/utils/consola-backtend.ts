import { createConsola } from "consola";

export const loggerB = createConsola({
  formatOptions: {
    date: true,
  },
}).withTag("backend");
