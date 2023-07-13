import mongoose, { Schema } from 'mongoose';



export interface KsrtcAttrs {
    
    name: string
    
    state: string
    
    depots?: string[]

    password: string

}


interface KsrtcModel extends mongoose.Model<KsrtcDoc> {

    build(attrs: KsrtcAttrs): KsrtcDoc;
    
}


 interface KsrtcDoc extends mongoose.Document {
    
    depots: string[]


}

const ksrtcSchema = new mongoose.Schema({

        name: {

            type: String,
            required:true

        },

        state: {
            
            type: String,
            required:true

        },

        depots: [
            { type: Schema.Types.ObjectId, ref: 'Depot', required: true }
        ],

        password: {
            type: String,
            required:true
        }

});
    




ksrtcSchema.statics.build = (attrs: KsrtcAttrs) => {

  return new KSRTC(attrs);
  
}; 

export const KSRTC = mongoose.model<KsrtcDoc, KsrtcModel>('KSRTC', ksrtcSchema);

