module.exports = function() {
    var colors = require('colors');
    this.terminal = colors;

    this.chat = {
        black: "§0",
        dark_blue: "§1",
        dark_green: "§2",
        dark_aqua: "§3",
        dark_red: "§4",
        dark_purple: "§5",
        gold: "§6",
        grey: "§7",
        dark_grey: "§8",
        blue: "§9",
        green: "§a",
        aqua: "§b",
        red: "§c",
        light_purple: "§d",
        yellow: "§e",
        white: "§f",
        obfuscated: "§k",
        bold: "§l",
        strikethrough: "§m",
        underline: "§n",
        italic: "§o",
        reset: "§r"
    }
}
