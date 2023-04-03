declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORDBOT_TOKEN: string;
			DISCORDBOT_GUILD: string;
			DISCORDBOT_SENDCHANNEL: string;
			DISCORDBOT_CHANGELOGCHANNEL: string;
		}
	}
}

export {};