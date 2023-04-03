// @ts-ignore
import Package          from "./../package.json";
import { ActivityType } from "discord.js";

DiscordBot.on( "ready", ( Client ) => {
	Client.user.setActivity( {
		name: `v.${ Package.version }`,
		type: ActivityType.Playing
	} )
} )