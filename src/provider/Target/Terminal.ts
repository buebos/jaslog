import { Format } from "../../core/Format";
import Target from "../../core/Target";
import {
    ANSI_BOLD,
    ANSI_COLOR_POSTFIX,
    ANSI_COLOR_PREFIX,
    ANSI_RESET,
} from "../../util/ansi/constant";

type TerminalWrap = "word" | "char";

type Config = {
    wrap?: TerminalWrap | "off";
    cursor?: {
        limit?: number;
    };
};

const TERMINAL_CURSOR_LIMIT = 120;

class Terminal implements Target {
    private wrap: TerminalWrap = "word";
    private cursor = {
        current: 0,
        limit: TERMINAL_CURSOR_LIMIT,
    };

    private shouldWrap: boolean = true;

    constructor(config?: Config) {
        if (config?.cursor?.limit === 0) {
            throw new Error("Invalid terminal cursor max width");
        }

        if (config?.wrap == "off") {
            this.shouldWrap = false;
            return;
        }

        this.cursor.limit = config?.cursor?.limit ?? this.cursor.limit;
        this.wrap = config?.wrap ?? this.wrap;
    }

    wrapOn() {
        this.shouldWrap = true;
    }
    wrapOff() {
        this.shouldWrap = false;
    }

    setWrapMode(mode: TerminalWrap) {
        this.wrap = mode;
    }
    setCursorLimit(limit: number) {
        this.cursor.limit = limit;
    }

    newLine(): void {
        process.stdout.write("\n");
        this.cursor.current = 0;
    }

    write(data: string): void {
        switch (this.wrap) {
            case "word": {
                this.writeByWord(data);
                break;
            }
            case "char": {
                this.writeByChar(data);
                break;
            }
            default:
                break;
        }
    }

    private writeByWord(data: string): void {
        let index = 0;
        const length = data.length;

        while (index < length) {
            let nextSpace = data.indexOf(" ", index);

            if (nextSpace === -1) {
                nextSpace = length;
            }

            const word = data.slice(index, nextSpace);
            const remainingSpace = this.cursor.limit - this.cursor.current;

            if (this.shouldWrap && word.length > remainingSpace) {
                this.newLine();
            }

            /**
             * If the word length is still greater than the cursor limit just
             * print it. This would mean that the cursor limit is small.
             */
            process.stdout.write(word);
            this.cursor.current += word.length;

            if (nextSpace < length) {
                process.stdout.write(" ");
                this.cursor.current += 1;
            }

            if (this.shouldWrap && this.cursor.current >= this.cursor.limit) {
                this.newLine();
            }

            index = nextSpace + 1;
        }
    }

    private writeByChar(data: string): void {
        for (let i = 0; i < data.length; i++) {
            const char = data[i];

            process.stdout.write(char);
            this.cursor.current += 1;

            if (this.shouldWrap && this.cursor.current >= this.cursor.limit) {
                this.newLine();
            }
        }
    }

    pushFormat(format: Format): void {
        let prefix = "";

        if (format.color) {
            prefix +=
                ANSI_COLOR_PREFIX + format.color.join(";") + ANSI_COLOR_POSTFIX;
        }
        if (format.bold) {
            prefix += ANSI_BOLD;
        }

        process.stdout.write(prefix);
    }

    clearFormat(): void {
        process.stdout.write(ANSI_RESET);
    }
}

export default Terminal;
