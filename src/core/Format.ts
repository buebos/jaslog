type RGB = [number, number, number];

enum FormatUnderline {
    NO_UNDERLINE = 0,
    STRAIGHT_LINE,
}

type Format = {
    color?: RGB;
    /** Its a number to supports levels of boldness */
    bold?: number;
    underline?: FormatUnderline;
};

export default Format;
