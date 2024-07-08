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
    .acln("requirements:");
managers.forEach((m) => {
    logger.chain.acln("- " + m.label);
});
logger.chain.out();

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
    .line("requirements:");
managers.forEach((m) => {
    logger.chain.line("- " + m.label);
});

/***********************************************
 * Blueprint logging - Sum of strings
 ***********************************************/

/**
 * Uses an object to define the error message, with title and desc properties
 */
logger.blueprint.error({
    title: "Dependency manager missing.",
    desc:
        "Your system does not have any of the supported dependency managers " +
        "installed. The create-next-kit requires at least one of the " +
        "following dependency managers to function properly. Please install " +
        "one of the following based on your project's dependency " +
        "requirements: " +
        managers.map((m) => "\n- " + m.label).join(""),
});

/***********************************************
 * Blueprint logging - Backtick strings
 ***********************************************/

logger.blueprint.error({
    title: "Dependency manager missing.",
    desc: `Your system does not have any of the supported dependency managers
    installed. The create-next-kit requires at least one of the following
    dependency managers to function properly. Please install one of the
    following based on your project's dependency requirements:
${managers.map((m) => "- " + m.label).join("\n")}`,
});

/***********************************************
 * Blueprint logging - Array join
 ***********************************************/

/**
 * Uses an object to define the error message, with title and desc properties
 * The desc property is a string built by joining an array of strings
 */
logger.blueprint.error({
    title: "Dependency manager missing.",
    desc: [
        "Your system does not have any of the supported dependency managers " +
            "installed. The create-next-kit requires at least one of the " +
            "following dependency managers to function properly. Please install " +
            "one of the following based on your project's dependency " +
            "requirements:",
        ...managers.map((m) => "- " + m.label),
    ].join("\n"),
});
