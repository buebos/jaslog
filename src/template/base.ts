import type { LoggerLevel } from "../core/Logger";

export type LevelBaseKeys = "info" | "warn" | "error" | "debug";

const color: Record<string, [number, number, number]> = {
    green: [0, 200, 20],
    yellow: [200, 200, 0],
    red: [230, 10, 20],
    purple: [200, 10, 200],
    desc: [230, 230, 230],
};

export const base: LoggerLevel<LevelBaseKeys> = {
    info: {
        global: {
            prefix: { format: { bold: 1, color: color.green } },
            format: { color: color.desc },
        },
        title: { format: { bold: 1, color: color.green } },
    },
    warn: {
        global: {
            prefix: { format: { bold: 1, color: color.yellow } },
            format: { color: color.desc },
        },
        title: { format: { bold: 1, color: color.yellow } },
    },
    error: {
        global: {
            prefix: { format: { bold: 1, color: color.red } },
            format: { color: color.desc },
        },
        title: { format: { bold: 1, color: color.red } },
    },
    debug: {
        global: {
            prefix: { format: { bold: 1, color: color.purple } },
            format: { color: color.desc },
        },
        title: { format: { bold: 1, color: color.purple } },
    },
};
