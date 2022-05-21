import fs from 'fs/promises';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
app.listen(process.env.SERVER_PORT || 5000);
app.use(express.static('./'));
