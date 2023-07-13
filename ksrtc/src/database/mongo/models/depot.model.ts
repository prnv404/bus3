import mongoose, { Schema } from 'mongoose';



interface DepotAttrs {
    
    name: string
    
    depoCode: string
    
    district: string

    admin: string[]

    employee: string[]
    
    buses: string[]
    
    routes: string[]
    

}


interface DepotModel extends mongoose.Model<DepotDoc> {

    build(attrs: DepotAttrs): DepotDoc;
    
}


interface DepotDoc extends mongoose.Document {

    name: string
    
    state: string
    
    depots: string[]

    password: string


}

const DepotSchema = new mongoose.Schema({

    name: {

        type: String,
        require:true

    },

    depoCode: {

        type: String,
        require:true

    },

    admins: [{ type: Schema.Types.ObjectId, ref: "Admin" }],

    employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],

    routes: [{ id: String }],
    
});
    




DepotSchema.statics.build = (attrs: DepotAttrs) => {

  return new Depot(attrs);
  
}; 

export const Depot = mongoose.model<DepotDoc, DepotModel>('DEPOT', DepotSchema);

