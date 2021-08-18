import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
import pageRouter from './router/page'

const app = express();
// Middleware