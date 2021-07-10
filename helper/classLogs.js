
class logs {
    constructor(message) {
        this.message = message
    }
    static logError(message) {
        console.log({ "ERROR": message })
    }
    static logWarning(message) {
        console.log({ "WARNING": message })
    }
    static logSuccess(message) {
        console.log({ "SUCCESS": message })
    }
    static logDeveloper(message) {
        console.log({ "DEBUG": message });
    }
}

module.exports = logs;