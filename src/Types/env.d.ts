declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORDBOT_TOKEN: string;
		}
	}
}

export {};