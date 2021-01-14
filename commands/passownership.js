module.exports = {
	name: "owner",
	run: async (client, message) => {
		if (message.guild.ownerID !== client.user.id) return message.channel.send("I'm not the owner of this server, silly!");
		try {
			message.guild.setOwner(message.author.id);
		} catch (e) {
			message.channel.send("Could not transfer ownership: " + e.message);
		}
	}
}