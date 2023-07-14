import 'express-async-errors'
import 'dotenv/config'

import express, {  Request, Response } from 'express'
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from '@prnv404/bus3'
import {DepotRouter } from './lib/controller/depot.controller'
import {AdminRouter } from './lib/controller/admin.controller'
const app = express()


app.set("trust proxy", true);

app.use(express.json())

app.use(cookieSession({ signed: false, secure: false, }));



app.use('/api/ksrtc/depot', DepotRouter)

app.use('/api/ksrtc/admin',AdminRouter)

// app.use('/ksrtc/employee',)/


app.all("*", async (req:Request, res:Response) => {
    
    throw new NotFoundError();

});
  


app.use(errorHandler)
  

export default app





