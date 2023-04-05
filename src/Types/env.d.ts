declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORDBOT_TOKEN : string;
			DISCORDBOT_GUILD : string;
			GITHUB_TOKEN : string;
			MONGODB_PORT : string;
			MONGODB_HOST : string;
			MONGODB_USER : string;
			MONGODB_PASSWD : string;
			MONGODB_DATABASE : string;
		}
	}
}

export {};