import LoggerLevel, { LevelKeyDefaults } from "../../core/LoggerLevel";
import { Target } from "../../core/Target";
import Terminal from "../Target/Terminal";

type ChainExecuteStrategy = "accumulate" | "immediate";
type ChainedLevel<Levels extends string> = {
    map: LoggerLevel<Levels>;
    current: LoggerLevel<Levels>[Levels];
};

type Config<Levels extends string> = {
    executeStrategy?: ChainExecuteStrategy;
    level?: ChainedLevel<Levels>;
    target?: Target;
};

const levelDefault: LoggerLevel<LevelKeyDefaults> = {
    info: {
        title: {
            format: { color: [0, 255, 0], bold: 1 },
        },
        desc: { format: { color: [200, 200, 200] } },
    },
    warn: {},
    error: {},
    debug: {},
};
const chainedLevelDefault: ChainedLevel<LevelKeyDefaults> = {
    current: levelDefault.info,
    map: levelDefault,
};

/**
 * Logger with methods prioritizing chaining strategy for
 * building messages.
 */
class Chained<Levels extends string = LevelKeyDefaults> {
    public execute: ChainExecuteStrategy = "immediate";

    private target: Target;
    private level: ChainedLevel<Levels>;

    constructor(config?: Config<Levels>) {
        this.execute = config?.executeStrategy ?? this.execute;

        this.target = config?.target ?? new Terminal();
        this.level =
            config?.level ?? (chainedLevelDefault as ChainedLevel<Levels>);
    }

    set(key: Levels): typeof this {
        this.level.current = this.level.map[key];

        return this;
    }

    title(message: string): typeof this {
        if (this.execute != "immediate") {
            throw new Error("Unimplemented");
        }

        if (this.level.current.title?.format) {
            this.target.pushFormat(this.level.current.title.format);
        }
        this.target.write(message);
        this.target.clearFormat();
        this.target.newLine();

        return this;
    }

    desc(message?: string): typeof this {
        return this.line(message);
    }

    line(message?: string): typeof this {
        if (this.execute != "immediate") {
            throw new Error("Unimplemented");
        }

        if (!message) {
            this.target.newLine();
            return this;
        }

        if (this.level.current.desc?.format) {
            this.target.pushFormat(this.level.current.desc?.format);
        }

        this.target.write(message);
        this.target.clearFormat();
        this.target.newLine();

        return this;
    }

    out() {}
}

export default Chained;
