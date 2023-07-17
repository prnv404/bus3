import { OTP, OtpAttrs } from "../model/otp.model";

export class OtpRepository {
      async create(data: OtpAttrs) {
            const otp = await OTP.build(data).save();
            return otp;
      }
}
