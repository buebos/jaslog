import LoggerLevel, {
    LevelSection,
    LevelDefaults,
} from "../../core/LoggerLevel";
import { Target } from "../../core/Target";
import Terminal from "../Target/Terminal";

type ChainExecuteStrategy = "accumulate" | "immediate";
type ChainedLevel<Levels extends string> = {
    map: LoggerLevel<Levels>;
    current: Levels;
};

type Config<Levels extends string> = {
    executeStrategy?: ChainExecuteStrategy;
    level?: ChainedLevel<Levels>;
    target?: Target;
};

const levelDefault: LoggerLevel<LevelDefaults> = {
    info: {
        global: { prefix: { format: { color: [0, 255, 0] } } },
        title: { format: { color: [255, 255, 255], bold: 1 } },
        desc: { format: { color: [200, 200, 200] } },
    },
    warn: {},
    error: {},
    debug: {},
};
const chainedLevelDefault: ChainedLevel<LevelDefaults> = {
    current: "info",
    map: levelDefault,
};

/**
 * Logger with methods prioritizing chaining strategy for
 * building messages.
 */
export class Chained<Levels extends string = LevelDefaults> {
    public execute: ChainExecuteStrategy = "immediate";

    private target: Target;
    private level: ChainedLevel<Levels>;
    public isPrefixEnabled: boolean = true;

    constructor(config?: Config<Levels>) {
        this.execute = config?.executeStrategy ?? this.execute;

        this.target = config?.target ?? new Terminal();
        this.level =
            config?.level ??
            (chainedLevelDefault as unknown as ChainedLevel<Levels>);
    }

    set(key: Levels): Chained<Levels> {
        this.level.current = key;
        return this;
    }
    prefix(): Chained<Levels> {
        this.isPrefixEnabled = true;
        return this;
    }
    noPrefix(): Chained<Levels> {
        this.isPrefixEnabled = false;
        return this;
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

    private write(section: LevelSection, message: string): typeof this {
        const level = this.getLevelInfo();

        if (this.execute != "immediate") {
            throw new Error("Unimplemented");
        }

        if (level[section]?.prefix?.format) {
            this.target.pushFormat(level[section].prefix.format);
        } else if (level.global?.prefix?.format) {
            this.target.pushFormat(level.global?.prefix?.format);
        } else if (level[section]?.format) {
            this.target.pushFormat(level[section].format);
        } else if (level.global?.format) {
            this.target.pushFormat(level.global.format);
        }

        this.target.write(this.getPrefix(section));

        if (level[section]?.prefix?.format || level.global?.prefix?.format) {
            this.target.clearFormat();

            if (level[section]?.format) {
                this.target.pushFormat(level[section].format);
            } else if (level.global?.format) {
                this.target.pushFormat(level.global.format);
            }
        }

        this.target.write(message);
        this.target.clearFormat();
        this.target.newLine();

        return this;
    }

    title(message: string): Chained<Levels> {
        return this.write("title", message);
    }

    desc(message?: string): Chained<Levels> {
        if (!message) {
            this.target.newLine();
            return this;
        }

        return this.write("desc", message);
    }

    line(message?: string): Chained<Levels> {
        return this.desc(message);
    }

    out() {}
}
