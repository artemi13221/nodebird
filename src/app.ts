import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import pageRouter from './router/page';

dotenv.config();
const app = express();
// Middleware
app.set('port', process.env.PORT ?? 10002);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan(process.env.MORGAN_ENV ?? 'dev'));
app.use(express.static(`${__dirname}/../public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET ?? 'cookie-secret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET ?? 'cookie-secret',
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 2,
  },
}));

app.use('/', pageRouter);

app.use((req, res, next) => {
  const error: Error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.locals.status = 404;
  next(error);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(res.locals.status ?? 500);
  res.render('error');
  next();
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}port open!!`);
});
