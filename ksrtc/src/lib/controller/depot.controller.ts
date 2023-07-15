import express ,{ Request, Response, Router } from "express";
import { DepotRepository } from "../database/mongo/repository/depot.repository";
import { DepotService } from "../service/depot.service";
import { currentUser, requireAuth } from "@prnv404/bus3";


const router = express()

const Service = new DepotService(new DepotRepository())

router.post("/",currentUser,requireAuth, async (req: Request, res: Response) => {

    const { depotCode, district, name } = req.body 
    
    const depot = await Service.createDepots({ depotCode, district, name })

    // Add the Depot to elastic search 

    res.status(201).json({ depot })
    
})
    
router.get('/all',currentUser,requireAuth, async (req: Request, res: Response) => {
        
    const Depot = await Service.GetAllDepots()
    
    res.send(Depot)

})

router.get('/:id',currentUser,requireAuth, async (req: Request, res: Response) => {
        
    const id = req.params.id


    const Depot = await Service.GetDepot(id)
    
    res.send(Depot)

})

router.patch('/edit/:id',currentUser,requireAuth, async (req: Request, res: Response) => {
        
    const id = req.params.id

    const { name,district,depotCode} = req.body

    const Depot = await Service.EditDepot(id, { name, district, depotCode })

    // Update in elastci search as well
    
    res.send(Depot)

})


router.delete('/delete/:id',currentUser,requireAuth, async (req: Request, res: Response) => {
        
    const id = req.params.id

    await Service.DeleteDepot(id)
    
    // Delete in Elastic Search as well
    
    res.send({ message:"Depot Deleted Successfully"})

})







    

export { router as DepotRouter }


    
