import 'dotenv/config'
import app from './app'
import { connectToMongoDB} from '@prnv404/bus3'
import { PushNotificatoinListener } from './event/listener/pushnotification'
import { kafka_client } from './config/kafka.config'
import { OTPNotificationListener } from './event/listener/otp.listener'

(async ()=> {
    

    try {


        await connectToMongoDB('mongodb://mongo-srv:27017/notification')

        const pushnotificationListener =  new PushNotificatoinListener(kafka_client)
        const otpListener = new OTPNotificationListener(kafka_client)


        await pushnotificationListener.listen()
        await otpListener.listen()

        app.listen(3000, () => {

            console.log("Server is Listening on port 3000")

        }).on('error', async() => {

            await pushnotificationListener.disconnect()
            await otpListener.disconnect()

        })

        
    } catch (error) {
        
        console.log(error)
        
    }

})()

