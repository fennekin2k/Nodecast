const http =require('http');

http.createServer((request, response) =>{
	
	response.setHeader('Access-Control-Allow-Methods', '*');
	response.setHeader('Access-Control-Allow-Headers', 'content-type');
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	
	response.writeHead(200, { 'content-Type': 'audio/webm' });
	
	console.log('Request received. Waiting for data');
	
	request.on('data', chunk => { // echo
		console.log('Data chunk received: ', chunk);
		response.write(chunk);
	});
	
	request.on('end', () => {
		console.log('Data stream ended');
		response.end(null);
	});
}).listen(10225)