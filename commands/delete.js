module.exports = {
	name: "delete",
	run: async (client, message, args) => {
		if (!args.length) return message.channel.send("Do you wanto to delete `all` servers or `one` server?");

		if (args[0] == "all") {
			let collected, filter = (m) => m.author.id === message.author.id && m.content.toLowerCase() == "yes" || m.content.toLowerCase() == "cancel";

			let notDeleted = [];

			message.channel.send("Are you sure you want to delete all servers? `yes` to confirm, `cancel` to cancel.");
			collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] })
				.then(c => {
					if (c.first().content === "cancel") return message.channel.send("Command cancelled.");
					if (c.first().content === "yes") {

						client.guilds.cache.each(g => {
							if (g.ownerID !== client.user.id) {
								notDeleted.push(g.name);
							}
							g.delete()
								.catch(console.error);
						})

						message.channel.send(`Deleted servers! \`${ notDeleted.join("`, `") }\` ${notDeleted.length > 1 ? "were" : "was"} NOT deleted!`);
					}
            })
		} else if (args[0] == "one") {
			if (!args[1]) return message.channel.send("Which guild do you want to delete? Try again and give its id lol");

			client.guilds.fetch(args[1])
				.then(g => {
					if (g.ownerID !== client.user.id) {
						message.channel.send("Could not delete server! It appears I am not the owner of that server!");
					}
					g.delete()
						.catch(console.error);
				})
        }
	}
}