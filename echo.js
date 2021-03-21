const http =require('http');
const url =require('url');


let tbuff =Buffer.from([]);

http.createServer((request, response) =>{
	
	response.setHeader('Access-Control-Allow-Methods', '*');
	response.setHeader('Access-Control-Allow-Headers', 'content-type');
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	
	let pathname =url.parse(request.url).pathname;
	switch(pathname){
		case '/talk':
			
			response.writeHead(200);
			
			console.log('Request received. Waiting for data');
			
			request.on('data', chunk => { // echo
				tbuff =chunk;
				console.log('Data chunk received: ', chunk);
			});
			
			request.on('end', () => {
				console.log('Data stream ended');
				response.end(null);
			});
			
		break;
		case '/listen':
			
			response.writeHead(200, { 'content-Type': 'audio/webm' });
			response.end(tbuff);
			
		break;
		default:
			response.end('Error 404');
		break;
	}
}).listen(8080);
