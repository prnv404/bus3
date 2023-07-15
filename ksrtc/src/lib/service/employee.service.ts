import { BadRequestError } from "@prnv404/bus3";
import { EmployeeAttrs } from "../database/mongo/models/employee.model";
import { EmployeeRepository } from "../database/mongo/repository/employee.repository";
import { IEmployee } from "../controller/employee.controller";
import { DepotRepository } from "../database/mongo/repository/depot.repository";


export class EmployeeService {

    constructor(private readonly employeeRepository: EmployeeRepository,private readonly depotRepository:DepotRepository) { }
    

    async createEmployee(data:EmployeeAttrs) {
        

        const EmployeeExist = await this.employeeRepository.findEmployee(data.phone)

        if (EmployeeExist) throw new BadRequestError("Employee Already Exist")
           
        const doc = await this.employeeRepository.createEmployee(data)

        const depot = await this.depotRepository.findByDepotCode(data.depotCode)


        depot?.employees.push(doc.id)

        await depot?.save()

        return doc
    }

    async getEmploye(id:string) {

        const user = await this.employeeRepository.getEmployeeById(id)
        
        if (!user) throw new BadRequestError("User Not found")
        
        return user

    }

    async getAllEmployees(depot:string) {

        return await this.employeeRepository.getAllEmployees(depot)

    }

    async EditEmployee(data: IEmployee, id:string) {

        const user = await this.employeeRepository.getEmployeeById(id)

        if (!user) throw new BadRequestError("No Employee Found")
        
        user.name = data.name || user.name

        user.phone = data.phone || user.phone

        user.type = data.type || user.type

        user.depotCode = data.depotCode || user.depotCode

        await user.save()

        return user

    }


    async DeleteEmployee(id:string) {

        const user = await this.employeeRepository.deleteEmployee(id)
        
        if (!user) throw new BadRequestError("No user Found ")
        
        return user
        

    }



}