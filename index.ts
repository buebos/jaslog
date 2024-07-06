export * from "./src/core/Format";
export * from "./src/core/Logger";
export * from "./src/core/Target";
export * from "./src/provider/Logger/Chained";
export * from "./src/provider/Target/File";
export * from "./src/provider/Target/Terminal";
export * from "./src/template/target";

import Logger from "./src/core/Logger";
import { chained } from "./src/template/logger";

export const template = { chained };

export default Logger;
