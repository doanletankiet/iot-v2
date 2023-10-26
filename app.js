const jsonserver = require('json-server');
const server = jsonserver.create();
const router = jsonserver.router('db.json');
const middlewares = jsonserver.defaults();
const port = 4000;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);
server.listen(port,()=>{
    console.log('Server is running on' + port);
})
