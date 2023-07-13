import { KsrtcAttrs } from "../models/ksrtc.model";
import { KSRTC } from "../models/ksrtc.model";


export class KsrtcRepository {

    async create(data:KsrtcAttrs) {

        const {name,password,state}  = data

        const ksrtc = KSRTC.build({ name, password, state })
        
        await ksrtc.save()

        return ksrtc

    }
    
    



}