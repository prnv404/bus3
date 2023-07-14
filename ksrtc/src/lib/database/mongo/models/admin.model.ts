import mongoose from 'mongoose';
import { Password } from '@prnv404/bus3'


export interface AdminAttrs {

    name: string

    role: string
    
    phone: number;

    password: string;
    
    otp?:number
    
}


interface AdminModel extends mongoose.Model<AdminDoc> {

    build(attrs: AdminAttrs): AdminDoc;
    
}


interface AdminDoc extends mongoose.Document {

    phone: number;
    
    password: string;

    role: string
    
    name: string
    
    isVerified: boolean
    
    otp:number
    
  
}

const AdminSchema = new mongoose.Schema({


    name: {

        type: String,

        required: true
        
    },

    phone: {

        type: Number,

        required: true
        
    },

    role: {

        type: String,

        required: true
        
    },

    password: {

        type: String,

        required: true
        
    },

    isVerified: {

        type: Boolean,

        default: false
        
    },

    otp: {
        type: Number,
        required:true
    }



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

AdminSchema.pre('save', async function (done) {
    
    if (this.isModified('password')) {
      
        const hashed = await Password.toHash(this.get('password'));
        
        this.set('password', hashed);
        
    }
    
    done();
    
});

AdminSchema.statics.build = (attrs: AdminAttrs) => {

    return new Admin(attrs);
    
};

const Admin = mongoose.model<AdminDoc, AdminModel>('Admin', AdminSchema);

export { Admin };
