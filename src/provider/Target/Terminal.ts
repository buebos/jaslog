import Format from "../../core/Format";
import { Target } from "../../core/Target";
import {
    ANSI_BOLD,
    ANSI_COLOR_POSTFIX,
    ANSI_COLOR_PREFIX,
    ANSI_RESET,
} from "../../util/ansi/constant";

type Config = {
    cursor?: {
        limit?: number;
    };
};

const TERMINAL_CURSOR_NO_LIMIT = -1;
const TERMINAL_CURSOR_MAX = 120;

class Terminal implements Target {
    private wrap: "word" | "char" = "word";
    private cursor = {
        current: 0,
        limit: TERMINAL_CURSOR_MAX,
    };

    constructor(config?: Config) {
        if (config?.cursor?.limit === 0) {
            throw new Error("Invalid terminal cursor max width");
        }

        this.cursor.limit = config?.cursor?.limit ?? this.cursor.limit;
    }

    newLine(): void {
        process.stdout.write("\n");
        this.cursor.current = 0;
    }

    write(data: string): void {
        if (this.wrap === "word") {
            this.writeByWord(data);
        } else {
            this.writeByChar(data);
        }
    }

    private writeByWord(data: string): void {
        let index = 0;
        const length = data.length;

        while (index < length) {
            let nextSpace = data.indexOf(" ", index);
            if (nextSpace === -1) nextSpace = length;

            const word = data.slice(index, nextSpace);
            const wordLength = word.length;
            const remainingSpace = this.cursor.limit - this.cursor.current;

            if (
                this.cursor.limit > TERMINAL_CURSOR_NO_LIMIT &&
                wordLength > remainingSpace
            ) {
                this.newLine();
            }

            process.stdout.write(word);
            this.cursor.current += wordLength;

            if (nextSpace < length) {
                process.stdout.write(" ");
                this.cursor.current += 1;
            }

            if (this.cursor.current >= this.cursor.limit) {
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

            if (this.cursor.current >= this.cursor.limit) {
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
