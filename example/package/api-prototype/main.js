/***********************************************
 * Variable arguments
 ***********************************************/

/**
 * Logs the error message using multiple string arguments
 */
logger.error(
    "Dependency manager missing.",
    "",
    "Your system does not have any of the supported dependency managers",
    "installed. The create-next-kit requires at least one of the",
    "following dependency managers to function properly. Please install",
    "one of the following based on your project's dependency",
    "requirements:",
    ...managers.map((m) => "- " + m.label)
);

/***********************************************
 * Chained logging - Execute all
 ***********************************************/

/**
 * Uses a fluent interface pattern to build the error message step-by-step
 */
logger.chain
    .set("error")
    .acln()
    .actitle("Dependency manager missing.")
    .desc()
    .acln()
    .acln("Your system does not have any of the supported dependency managers")
    .acln("installed. The create-next-kit requires at least one of the")
    .acln("following dependency managers to function properly. Please install")
    .acln("one of the following based on your project's dependency")
    .acln("requirements:")
    .acln(managers.map((m) => "- " + m.label).join("\n"))
    .out();

/***********************************************
 * Chained logging - Execute each
 ***********************************************/

/**
 * Similar to the previous example, but uses a line() method to add new lines to the message
 */
logger.chain
    .set("error")
    .line()
    .title("Dependency manager missing.")
    .desc()
    .line()
    .line("Your system does not have any of the supported dependency managers")
    .line("installed. The create-next-kit requires at least one of the")
    .line("following dependency managers to function properly. Please install")
    .line("one of the following based on your project's dependency")
    .line("requirements:")
    .line(managers.map((m) => "- " + m.label).join("\n"));

/***********************************************
 * Object-oriented logging - Sum of strings
 ***********************************************/

/**
 * Uses an object to define the error message, with title and desc properties
 */
logger.template.error({
    title: "Dependency manager missing.",
    desc:
        "Your system does not have any of the supported dependency managers\n" +
        "installed. The create-next-kit requires at least one of the\n" +
        "following dependency managers to function properly. Please install\n" +
        "one of the following based on your project's dependency\n" +
        "requirements:\n" +
        managers.map((m) => "\n- " + m.label).join(""),
});

/***********************************************
 * Object-oriented logging - Backtick strings
 ***********************************************/

logger.template.error({
    title: "Dependency manager missing.",
    desc: `Your system does not have any of the supported dependency managers
    installed. The create-next-kit requires at least one of the following
    dependency managers to function properly. Please install one of the
    following based on your project's dependency requirements:
${managers.map((m) => "- " + m.label).join("\n")}`,
});

/***********************************************
 * Object-oriented logging - Array join
 ***********************************************/

/**
 * Uses an object to define the error message, with title and desc properties
 * The desc property is a string built by joining an array of strings
 */
logger.template.error({
    title: "Dependency manager missing.",
    desc: [
        "Your system does not have any of the supported dependency managers",
        "installed. The create-next-kit requires at least one of the",
        "following dependency managers to function properly. Please install",
        "one of the following based on your project's dependency",
        "requirements:",
        ...managers.map((m) => "- " + m.label),
    ].join("\n"),
});
