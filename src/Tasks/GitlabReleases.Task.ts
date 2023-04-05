import { Octokit }         from "octokit";
import { IGithubReleases } from "../Types/MongoDB";
import DB_GithubReleases   from "../MongoDB/DB_GithubReleases";


const TaskEvery = 300; // In Seconds
const StartOnInit = 1; // In Seconds
const Enabled = true;

const octokit = new Octokit( {
	auth: process.env.GITHUB_TOKEN,
	userAgent: "ArkLin-Bot"
} )

const TaskFunction = async() => {
	try {
		const Releases = await octokit.request( 'GET /repos/{owner}/{repo}/releases', {
			owner: 'kyri123',
			repo: 'ArkLin2.0',
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		} )

		if ( Releases.data.length > 0 ) {
			for ( const Release of Releases.data ) {
				const ReleaseData : IGithubReleases = {
					assets_url: Release.assets_url,
					body: Release.body!,
					created_at: Release.created_at,
					draft: Release.draft,
					html_url: Release.html_url,
					id: Release.id,
					name: Release.name!,
					node_id: Release.node_id,
					prerelease: Release.prerelease,
					published_at: Release.published_at!,
					tag_name: Release.tag_name,
					target_commitish: Release.target_commitish,
					upload_url: Release.upload_url,
					url: Release.url
				}

				if ( !await DB_GithubReleases.exists( { id: Release.id } ) ) {
					const Channel = await DiscordBot.channels.fetch( process.env.DISCORDBOT_SENDCHANNEL );
					if ( Channel ) {
						const DBRelease = await DB_GithubReleases.create( ReleaseData );
						if ( DBRelease ) {
							// todo: remove dirty fix DBRelease.tag_name !== "2.0.0"
							if ( Channel && Channel.isTextBased() && DBRelease.tag_name !== "2.0.0" ) {
								await Channel.sendTyping();
								await Channel.send( "<@&722088747814092813> \n\n" +
									`**${ DBRelease.name }**\n` +
									"\n" +
									"Bitte beachtet dass dies eine sehr \"experimentelle\" Version. Viele Features aus dem vorherigen ArkLin2 sind nicht implementiert. \n" +
									"Das Panel sollte das Update automatisch ausführen (der Script ist noch experimentell, sollte dies nicht der Fall sein bitte meldet es)\n\n" +
									"Changelog ist auch auf dem Panel verfügbar. Viel Spaß! :)\n\n" +
									`Changelog: ${ DBRelease.html_url }\n` +
									`Bug Report / Vorschläge / Suggestion: https://github.com/Kyri123/ArkLin2.0/issues`
								)
								console.log( "Release:", Release.name )
							}
						}
					}
				}
			}
		}
	}
	catch ( e ) {
	}
}

if ( Enabled ) {
	setTimeout( TaskFunction, Math.min( StartOnInit, TaskEvery ) * 1000 );
	setInterval( TaskFunction, TaskEvery * 1000 );
}