import  express , { Request, Response }  from "express";
import indexRouter from "./routes/index";
import usersRouter from "./routes/authentication";
import postsRouter from './routes/posts';
import bodyParser from 'body-parser';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function (req: Request , res: Response) {
  res.json({
    status: true,
    message: "Welcome"
  })
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', postsRouter);

// app.listen(3000, function () {
//    console.log("Server started at port " + 3000);
// })

export default app