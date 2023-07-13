import mongoose from 'mongoose';


interface EmployeeAttrs {

    name: string

    type: string
    
    depotCode: string
    
    phone : number
    
}


interface EmployeeModel extends mongoose.Model<UserDoc> {

    build(attrs: EmployeeAttrs): UserDoc;
    
}


interface UserDoc extends mongoose.Document {

    name: string

    type: string
    
    depotCode: string
    
    phone : number
    
  
}

const EmployeeSchema = new mongoose.Schema({


    name: {

        type: String,

        required: true
        
    },

    type: {

        type: String,

        required: true
        
    },

    depotCode: {

        type: String,

        required: true
        
    },

    phone: {
        
        type: Number,

        required:true
    }



});



EmployeeSchema.statics.build = (attrs: EmployeeAttrs) => {

    return new Employee(attrs);
    
};

const Employee = mongoose.model<UserDoc, EmployeeModel>('Employee', EmployeeSchema);

export { Employee };
