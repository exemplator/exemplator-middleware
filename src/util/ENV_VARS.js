let ENV_VARS

const CONSTANTS = {

}

if (process.env.NODE_ENV === "production") {
  ENV_VARS = {
    ROOT: "build",
    CONSTANTS: CONSTANTS,
  }
} else {
  ENV_VARS = {
    ROOT: "dev",
    CONSTANTS: CONSTANTS,
  }
}

export default ENV_VARS