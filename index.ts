export * from "./src/core/Format";
export * from "./src/core/Logger";
export * from "./src/core/Target";
export * from "./src/provider/Level/base";
export * from "./src/provider/Logger/Blueprint";
export * from "./src/provider/Logger/Chained";
export * from "./src/provider/Target/File";
export * from "./src/provider/Target/Terminal";

import { terminal } from "./src/template/target";
import { chained } from "./src/template/logger";

export const template = { chained };
export const target = { terminal };
