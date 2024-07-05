export * from "./src/core/LoggerLevel";
export * from "./src/provider/Logger/Chained";

import { chained } from "./src/template/logger";

export const template = {
    chained,
};
