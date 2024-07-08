export * from "./src/core/Format";
export * from "./src/core/Logger";
export * from "./src/core/Target";
export * from "./src/provider/Logger/Blueprint";
export * from "./src/provider/Logger/Chained";
export * from "./src/provider/Target/Terminal";
export * from "./src/template/base";

import { chained, blueprint } from "./src/template/logger";
import { terminal } from "./src/template/target";

export const template = { chained, blueprint };
export const target = { terminal };
