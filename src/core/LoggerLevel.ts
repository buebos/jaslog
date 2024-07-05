import Format from "./Format";

type LevelInfo = {
    title?: {
        label?: string;
        format?: Format;
    };
    desc?: {
        label?: string;
        format?: Format;
    };
};

type LoggerLevel<Levels extends string> = Record<Levels, LevelInfo>;

export type LevelKeyDefaults = "info" | "warn" | "error" | "debug";

export default LoggerLevel;
