
import { currentUser, requireAuth } from '@prnv404/bus3'
import express, { Request, Response } from 'express'
import { BusAttrs } from '../database/mongo/models/buses.model'
import { BusService } from '../service/bus.service'
import { BusRepository } from '../database/mongo/repository/bus.repository'
import { DepotRepository } from '../database/mongo/repository/depot.repository'


const router = express()

const Service = new BusService(new BusRepository(),new DepotRepository())


router.post("/", currentUser, requireAuth, async (req:Request,res:Response) => {
    

    const data = req.body as BusAttrs

    const bus = await Service.CreateBus(data)

    // Add to bus to elastic search

    res.status(201).json(bus)


})


router.get("/all", currentUser, requireAuth, async (req:Request,res:Response) => {


    const depotCode = req.query.depotCode as string

    const buses = await Service.GetAllBus(depotCode)

    res.status(200).json(buses)


})


router.get("/:id", currentUser, requireAuth, async (req:Request,res:Response) => {
    

    const id = req.params.id

    const bus = await Service.GetBus(id)

    res.status(200).json(bus)


})

router.patch("/edit/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
    
    const id = req.params.id
    
    const data = req.body as BusAttrs

    const bus = await Service.EditBus(id, data)
    
    // update the bus in elastic search as well

    res.status(200).json(bus)


})

router.delete("/delete/:id", currentUser, requireAuth, async (req: Request, res: Response) => { 

    const id = req.params.id

    const bus = await Service.DeleteBus(id)

    res.status(200).json(bus)


})


export {router as BusRouter }