import twilio from 'twilio'

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN


const TwilioClient = twilio(accountSid, authToken)

export default TwilioClient