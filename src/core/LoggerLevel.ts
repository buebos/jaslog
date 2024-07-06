import Format from "./Format";

export type LevelSection = "global" | "title" | "desc";

export type LevelSectionInfo = {
    format?: Format;
    prefix?: {
        label?: string;
        format?: Format;
    };
};

type LevelInfo = { label?: string } & {
    [key in LevelSection]?: LevelSectionInfo;
};

type LoggerLevel<Levels extends string> = Record<Levels, LevelInfo>;

export type LevelDefaults = "info" | "warn" | "error" | "debug";

export default LoggerLevel;
