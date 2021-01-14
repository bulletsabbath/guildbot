const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

client.once("ready", () => console.log("fuck"));

client.on("message", async message => {
	let prefix = ".";
	if (message.author.bot || !message.guild) return;

	if (!message.content.startsWith(prefix)) return;
	const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

	const command = client.commands.get(cmd.toLowerCase())
	if (!command) return;

	command.run(client, message, args);
});

client.login("Nzc0MzY5Nzg1NTE2NjU0NjIz.X6WyDw.tP7aC2U9949gUEdgtsbz5NPYbHg");