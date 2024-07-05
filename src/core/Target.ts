import type Format from "./Format";

export interface Target {
    write(data: string): void;

    pushFormat(format: Format): void;
    clearFormat(): void;

    newLine(): void;
}
