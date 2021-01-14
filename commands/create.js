module.exports = {
    name: "create",
    run: async (client, message, args) => {
		client.guilds.create(args.join(" ") || "server", {
			icon: "https://i.pinimg.com/originals/70/c7/4f/70c74fbd6a9dff43df0843cc76e7d961.jpg",
			region: "europe",
		})
			.then(guild => {
				guild.channels.create("im-lazy-to-make-a-script-channel")
					.then(channel => {
						channel.createInvite()
							.then(inv => {
								message.channel.send("Created server!\n" + "https://discord.gg/" + inv);
							})

					})
			})
    }
}