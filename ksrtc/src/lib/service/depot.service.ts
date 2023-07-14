import { BadRequestError } from "@prnv404/bus3";
import { DepotAttrs } from "../database/mongo/models/depot.model";
import { DepotRepository } from "../database/mongo/repository/depot.repository";


export class DepotService {

    constructor(private readonly depotRepository: DepotRepository) { }
    
    async createDepots(data: DepotAttrs) {


        const depotName = await this.depotRepository.findDepotByName(data.name)

        const depotCode = await this.depotRepository.findDepotByDepotCode(data.depotCode) 

        if (depotName || depotCode) throw new BadRequestError("Depot Already Exist");

        const result = await this.depotRepository.create(data)

        return result

    }


    async GetDepot(id: string) {
        
        const depot = await this.depotRepository.findById(id) 
        
        if (!depot) throw new BadRequestError("No Depot Found")
        
        return depot
        
    }

    async GetAllDepots() {

        const result = await this.depotRepository.findAllDepot()

        return result

    }

    async EditDepot(id:string,data:DepotAttrs) {

        const depot = await this.depotRepository.findById(id)

        if (!depot) throw new BadRequestError("No Depot Found")
        
        depot.name = data.name || depot.name
        depot.district = data.district || depot.district
        depot.depotCode = data.depotCode || depot.depotCode

        await depot.save()

        return depot

    }

    async DeleteDepot(id:string) {
            
        const isExist = await this.depotRepository.findById(id)

        if (!isExist) throw new BadRequestError("No Depot Found !!")
        
        await this.depotRepository.deleteDepot(id)

        return true

    }



}