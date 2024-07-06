import type { LoggerLevel } from "../../core/Logger";

export type LevelDefaults = "info" | "warn" | "error" | "debug";

const base: LoggerLevel<LevelDefaults> = {
    info: {
        global: {
            format: { color: [230, 230, 230] },
            prefix: { format: { color: [0, 200, 20] } },
        },
    },
    warn: {
        global: {
            format: { color: [230, 230, 230] },
            prefix: { format: { color: [200, 200, 0] } },
        },
    },
    error: {
        global: {
            format: { color: [230, 230, 230] },
            prefix: { format: { color: [200, 10, 20] } },
        },
    },
    debug: {
        global: {
            format: { color: [230, 230, 230] },
            prefix: { format: { color: [200, 10, 200] } },
        },
    },
};

export default base;
