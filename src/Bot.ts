import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
config();

global.DiscordBot = new Client({ intents: [
	GatewayIntentBits.Guilds
] } )

// Import Handels
import "./Bot.Ready"
import "./Bot.Messages"
import "./Bot.Reactions"

// Start Client
DiscordBot.login( process.env.DISCORDBOT_TOKEN ).then( () => console.log( "YAY!" ) );

// Import Tasks
import "./Tasks"