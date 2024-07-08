type RGB = [number, number, number];

enum FormatUnderline {
    NO_UNDERLINE = 0,
    STRAIGHT_LINE,
}

export type Format = {
    color?: RGB;
    /** Its a number to supports levels of boldness */
    bold?: number;
    underline?: FormatUnderline;
};
