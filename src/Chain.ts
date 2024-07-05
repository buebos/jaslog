import { Target } from "./Target";
import { ANSI_COLOR_POSTFIX, ANSI_COLOR_PREFIX, ANSI_RESET } from "./util/ansi";
import { LoggerLevel } from "./Level";

class Chain<StateKey extends string> {
    private ac: string = "";
    private target: Target;
    private level: LoggerLevel<StateKey>;

    constructor(target: Target, state: LoggerLevel<StateKey>) {
        this.target = target;
        this.level = state;
    }

    set(key: StateKey) {
        this.level.current = this.level.map[key];
        return this;
    }

    title(message: string) {
        const rgb = this.level.current.color.title;
        const code = ANSI_COLOR_PREFIX + rgb.join(";") + ANSI_COLOR_POSTFIX;

        this.target.write(code + message + ANSI_RESET + "\n");

        return this;
    }

    desc(message?: string) {
        if (!this.level.current.color.desc) {
            return this.target.write((message ?? "") + "\n");
        }

        const rgb = this.level.current.color.desc;
        const code = ANSI_COLOR_PREFIX + rgb.join(";") + ANSI_COLOR_POSTFIX;

        this.target.write(code + message + ANSI_RESET + "\n");

        return this;
    }

    line(message: string) {
        return this;
    }

    out() {}
}

export default Chain;
