import mongoose from 'mongoose';
import { Password } from '@prnv404/bus3'


interface AdminAttrs {

    name: string

    role: string
    
    email: string;

    password: string;
    
}


interface AdminModel extends mongoose.Model<AdminDoc> {

    build(attrs: AdminAttrs): AdminDoc;
    
}


interface AdminDoc extends mongoose.Document {

    email: string;
    
    password: string;
    
  
}

const AdminSchema = new mongoose.Schema({


    name: {

        type: String,

        required: true
        
    },

    email: {

        type: String,

        required: true
        
    },

    password: {

        type: String,

        required: true
        
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
