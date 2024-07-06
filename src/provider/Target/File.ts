import Format from "../../core/Format";
import { Target } from "../../core/Target";

class File implements Target {
    clearFormat(): void {}
    newLine(): void {}
    pushFormat(format: Format): void {}
    write(data: string): void {}
}

export default File;
