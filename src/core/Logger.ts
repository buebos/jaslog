import Format from "./Format";
import { Target } from "./Target";

export type ConfigLevel<Levels extends string> = {
    map: LoggerLevel<Levels>;
    current: Levels;
};

export type LoggerConfig<Levels extends string> = {
    targets: Target[];
    level: ConfigLevel<Levels>;
};

export type LevelSection = "global" | "title" | "desc";

export type LevelSectionInfo = {
    format?: Format;
    prefix?: {
        label?: string;
        format?: Format;
    };
};

export type LevelInfo = { label?: string } & {
    [key in LevelSection]?: LevelSectionInfo;
};

export type LoggerLevel<Levels extends string> = Record<Levels, LevelInfo>;

export type LevelDefaults = "info" | "warn" | "error" | "debug";

/**
 * Logger with methods prioritizing chaining strategy for
 * building messages.
 */
class Logger<Levels extends string = LevelDefaults> {
    private targets: Target[];
    private level: ConfigLevel<Levels>;
    public isPrefixEnabled: boolean = true;

    constructor(config: LoggerConfig<Levels>) {
        this.targets = config.targets;
        this.level = config.level;
    }

    setLevel(key: Levels) {
        this.level.current = key;
    }

    private getLevelInfo() {
        return this.level.map[this.level.current];
    }
    private getPrefix(section: LevelSection): string {
        if (!this.isPrefixEnabled) {
            return "";
        }

        const level = this.getLevelInfo();
        const prefixParts = ["[", "", "]: "];

        if (level[section]?.prefix?.label) {
            prefixParts[1] = level[section].prefix.label;
        } else if (level.global?.prefix?.label) {
            prefixParts[1] = level.global.prefix.label;
        } else {
            prefixParts[1] = this.level.current.toLocaleUpperCase();
        }

        return prefixParts.join("");
    }

    write(message: string, section: LevelSection = "desc"): void {
        const level = this.getLevelInfo();

        for (const target of this.targets) {
            if (level[section]?.prefix?.format) {
                target.pushFormat(level[section].prefix.format);
            } else if (level.global?.prefix?.format) {
                target.pushFormat(level.global?.prefix?.format);
            } else if (level[section]?.format) {
                target.pushFormat(level[section].format);
            } else if (level.global?.format) {
                target.pushFormat(level.global.format);
            }

            target.write(this.getPrefix(section));

            if (
                level[section]?.prefix?.format ||
                level.global?.prefix?.format
            ) {
                target.clearFormat();

                if (level[section]?.format) {
                    target.pushFormat(level[section].format);
                } else if (level.global?.format) {
                    target.pushFormat(level.global.format);
                }
            }

            target.write(message);
            target.clearFormat();
        }
    }

    line(message?: string, section: LevelSection = "desc") {
        if (!message) {
            for (const target of this.targets) {
                target.newLine();
            }
            return;
        }

        this.write(message, section);

        for (const target of this.targets) {
            target.newLine();
        }
    }
}

export default Logger;
