import base from "../../packages/config/eslint.config.js";
import next from "eslint-config-next";

export default [...base, next()];
