const TaskEvery: number = 5; // In Seconds
const StartOnInit: number = 0; // In Seconds
const Enabled: boolean = true;

const TaskFunction = async () => {
	console.log( "Hello World I'm a Task!" )
}

if( Enabled ) {
	setTimeout( TaskFunction, Math.max( StartOnInit, TaskEvery ) * 1000 );
	setInterval( TaskFunction, TaskEvery * 1000 );
}