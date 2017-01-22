module.exports = {
  getMessageFromError: function(error, info) {
    switch (error) {
      case "COMMAND_NOT_FOUND":
        return "The command \"" + info[0] + "\" was not found."
        break;
      default:
        return "Undefined error " + error;
    }
  }
}
