export type RGB = [number, number, number];

export type LevelInfo = {
    color: { title: RGB; desc?: RGB };
};

export type LoggerLevel<LevelKey extends string> = {
    map: Record<LevelKey, LevelInfo>;
    current: LevelInfo;
};

export type LoggerLevelDefault = "info" | "warn" | "error" | "debug";

export const LoggerLevelMapDefault: LoggerLevel<LoggerLevelDefault>["map"] = {
    info: { color: { title: [0, 255, 0] } },
    warn: { color: { title: [0, 255, 255] } },
    error: { color: { title: [255, 0, 0] } },
    debug: { color: { title: [255, 0, 255] } },
};
