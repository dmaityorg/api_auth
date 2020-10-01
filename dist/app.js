"use strict";
// var createError = require('http-errors');
// var express = require('express');
// import path from "path";
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/authentication');
// var postsRouter = require('./routes/posts');
// var debug = require('debug')('api-auth:server');
// var http = require('http');
// var app = express();
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/api', postsRouter);
// // catch 404 and forward to error handler
// app.use(function(req: any, res: any, next: any) {
//   next(createError(404));
// });
// // error handler
// app.use(function(err: any, req: any, res: any, next: any) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// //module.exports = app;
// //-------------------------------------
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
// /**
//  * Create HTTP server.
//  */
// var server = http.createServer(app);
// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
// /**
//  * Normalize a port into a number, string, or false.
//  */
// function normalizePort(val: any) {
//   var port = parseInt(val, 10);
//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }
//   if (port >= 0) {
//     // port number
//     return port;
//   }
//   return false;
// }
// /**
//  * Event listener for HTTP server "error" event.
//  */
// function onError(error: any) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
// /**
//  * Event listener for HTTP server "listening" event.
//  */
// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
const express_1 = __importDefault(require("express"));
var app = express_1.default();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/authentication');
var postsRouter = require('./routes/posts');
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.json({
        status: true,
        message: "Welcome"
    });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', postsRouter);
app.listen(3000, function () {
    console.log("Server started at port " + 3000);
});
