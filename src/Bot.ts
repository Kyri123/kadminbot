import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import path from "path";
import mongoose from "mongoose";


config( {
	path: path.join( __dirname, "../.env.dev" )
} );

mongoose.connect( `mongodb://${ process.env.MONGODB_HOST }:${ process.env.MONGODB_PORT }`, {
	user: process.env.MONGODB_USER,
	pass: process.env.MONGODB_PASSWD
} )
	.then( async() => {
		console.log( "Mongo CONNECT!" )
	} )

global.DiscordBot = new Client({ intents: Object.values( GatewayIntentBits ) as GatewayIntentBits[] } )

// Import Handels
import "./Bot.Ready"
import "./Bot.Messages"
import "./Bot.Reactions"

// Start Client
DiscordBot.login( process.env.DISCORDBOT_TOKEN ).then( () => console.log( "Hallo I'm Here!" ) );

// Import Tasks
import "./Tasks"
