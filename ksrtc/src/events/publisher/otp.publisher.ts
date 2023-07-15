import { KafkaPublisher, TOPIC } from "@prnv404/bus3";


interface OTPEvent {
    topic: TOPIC.OTP,
    data: {
        phone: number,
        otp: string,
        message:string
    }
}
export class SENDOTPNOTIFICATION extends KafkaPublisher<OTPEvent >{

    topic: TOPIC.OTP = TOPIC.OTP

}