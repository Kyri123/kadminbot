import * as fs   from "fs";

for( const File of fs.readdirSync( "./src/Tasks" ) ) {
	if( File.endsWith( "Task.ts" ) ) {
		import( "./Tasks/" + File );
	}
}