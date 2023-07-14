import { EmployeeAttrs } from "../database/mongo/models/employee.model";
import { EmployeeRepository } from "../database/mongo/repository/employee.repository";


export class EmployeeService {

    constructor(private readonly employeeRepository: EmployeeRepository) { }
    

    async createEmployee(data:EmployeeAttrs) {
        
        const doc = await this.employeeRepository.createEmployee(data)
        return doc
    }

    async getEmployeeById(id:string) {

        return  await this.employeeRepository.getEmployeeById(id)

    }

    async getAllEmployees(depot:string) {

        return await this.employeeRepository.getAllEmployees(depot)

    }



}