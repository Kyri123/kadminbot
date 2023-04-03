import DB_Releases from "./../MongoDB/DB_Releases";
import { IGitlabRelease } from "./../Types/Gitlab.Release";

const TaskEvery = 60; // In Seconds
const StartOnInit = 1; // In Seconds
const Enabled = true;

const TaskFunction = async () => {
	console.log( "TaskFunction" )
	try {
		const GitlabLink = "https://git.kyrium.space/api/v4/projects/2/releases/";
		const Result = await fetch( GitlabLink ).catch( console.error );
		if ( Result ) {
			const Json: IGitlabRelease[] = await Result.json();
			for ( const Release of Json ) {
				const Hash = Release.commit.id;
				if ( !await DB_Releases.exists( { Hash: Hash } ) ) {
					const Channel = await DiscordBot.channels.fetch( process.env.DISCORDBOT_SENDCHANNEL );
					if ( Channel && Channel.isTextBased() ) {
						await Channel.sendTyping();
						await Channel.send( "<@&722088747814092813> \n\n" +
							`**${ Release.name }**\n` +
							"\n" +
							"Bitte beachtet dass dies eine sehr \"experimentelle\" Version. Viele Features aus dem vorherigen ArkLin2 sind nicht implementiert. \n" +
							"**Außerdem modifiziert das neue ArkLin sehr aggressiv die arkamanger.cfg Dateien. Stellt sicher dass alle Arkserver davor runtergefahren sind!**\n\n" +
							`Changelog: ${ Release._links.self }\n` +
							`Bug Report / Vorschläge / Suggestion: ${ Release._links.opened_issues_url }\n` +
							`Repo: https://git.kyrium.space/arktools/kadmin-arklin2`
						)
						await DB_Releases.create( { Hash: Hash } );
						console.log( "Release:", Release.name )
					}
				}
			}
		}
	} catch ( e ) {}
}

if ( Enabled ) {
	setTimeout( TaskFunction, Math.min( StartOnInit, TaskEvery ) * 1000 );
	setInterval( TaskFunction, TaskEvery * 1000 );
}