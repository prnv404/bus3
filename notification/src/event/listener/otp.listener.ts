import {  Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC } from '@prnv404/bus3'
import TwilioClient from "../../config/twilio.config";



interface OTPEvent {
    topic: TOPIC.OTP,
    data: {
        phone: number,
        otp: string,
        message:string
    }
}

export class OTPNotificationListener extends KafkaListener<OTPEvent>{

    groupId: string = TOPIC.OTP

    topic: TOPIC.OTP = TOPIC.OTP

    constructor(client:Kafka) {
        super(client)
    }

   async onMessage(data: OTPEvent['data'], message: KafkaMessage): Promise<void> {

       
      await TwilioClient.messages.create({
           body: data.message + data.otp,
           from:"+16184278576",
           to:'+91'+data.phone
       })  
       
       
    }   

}
