import { Blueprint, target, base } from "../index";

const logger = Blueprint.create({
    level: base,
    targets: [target.terminal],
});

logger.info({
    title: "Dependency manager missing.",
    desc:
        "Your system does not have any of the supported dependency managers " +
        "installed. The create-next-kit requires at least one of the " +
        "following dependency managers to function properly. Please install " +
        "one of the following based on your project's dependency " +
        "requirements:",
});

logger.line();

logger.error({
    title: "Dependency manager missing.",
    desc:
        "Your system does not have any of the supported dependency managers " +
        "installed. The create-next-kit requires at least one of the " +
        "following dependency managers to function properly. Please install " +
        "one of the following based on your project's dependency " +
        "requirements:",
});
