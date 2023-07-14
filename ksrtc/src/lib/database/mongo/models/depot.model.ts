import mongoose, { Schema } from 'mongoose';


export interface DepotAttrs {
    
    name: string
    
    depotCode: string
    
    district: string

    employee?: string[]
    
    buses?: string[]
    
    routes?: string[]
    

}


interface DepotModel extends mongoose.Model<DepotDoc> {

    build(attrs: DepotAttrs): DepotDoc;
    
}


interface DepotDoc extends mongoose.Document {

    name: string
    
    depotCode: string
    
    district: string

    employee: string[]
    
    buses: string[]
    
    routes: string[]


}

const DepotSchema = new mongoose.Schema({

    name: {

        type: String,
        require:true

    },

    depotCode: {

        type: String,
        require:true

    },

    district: {
        type: String,
        required:true
    },



    lat: String,

    lng:String,

    employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],

    routes: [{ id: String }],
    
},{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  });
    




DepotSchema.statics.build = (attrs: DepotAttrs) => {

  return new Depot(attrs);
  
}; 

export const Depot = mongoose.model<DepotDoc, DepotModel>('DEPOT', DepotSchema);

