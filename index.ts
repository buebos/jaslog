export * from "./src/core/Logger";
export * from "./src/provider/Logger/Blueprint";
export * from "./src/provider/Logger/Chained";
export * from "./src/template/base";

import Logger from "./src/core/Logger";
import Terminal from "./src/provider/Target/Terminal";
import { blueprint, chained } from "./src/template/logger";
import { terminal } from "./src/template/target";

export const template = { chained, blueprint };
export const target = { terminal };

export default {
    Terminal,
    Logger,
};
