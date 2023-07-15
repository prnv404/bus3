import { Employee, EmployeeAttrs } from "../models/employee.model";


export class EmployeeRepository {


    async createEmployee(data:EmployeeAttrs) {

        const doc = await Employee.build(data).save()

        return doc

    }

    async getEmployeeById(id:string){

        const doc = await Employee.findById(id)
        
        return doc

    }

    async findEmployee(phone: number) {

        const user = await Employee.findOne({ phone })
        
        return user
        
    }

    async getAllEmployees(depotCode:string) {
        
        const doc = await Employee.find({ depotCode })
        
        return doc

    }


    async deleteEmployee(id:string) {

        const doc = await Employee.findByIdAndDelete(id)

        return doc

    }


}