import Format from "../../core/Format";
import { Target } from "../../core/Target";
import {
    ANSI_BOLD,
    ANSI_COLOR_POSTFIX,
    ANSI_COLOR_PREFIX,
    ANSI_RESET,
} from "../../util/ansi/constant";

class Terminal implements Target {
    write(data: string): void {
        process.stdout.write(data);
    }

    newLine(): void {
        process.stdout.write("\n");
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

        this.write(prefix);
    }

    clearFormat(): void {
        process.stdout.write(ANSI_RESET);
    }
}

export default Terminal;
