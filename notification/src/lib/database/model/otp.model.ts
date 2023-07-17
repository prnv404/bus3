import mongoose from "mongoose";

export interface OtpAttrs {
      userId: string;

      otp: string;

      message: string;
}

interface OtpModel extends mongoose.Model<AdminDoc> {
      build(attrs: OtpAttrs): AdminDoc;
}

interface AdminDoc extends mongoose.Document {
      userId: string;

      otp: string;

      message: string;
}

const OtpSchema = new mongoose.Schema(
      {
            userId: {
                  type: mongoose.Types.ObjectId,

                  required: true,
            },

            otp: {
                  type: String,

                  required: true,
            },

            message: {
                  type: String,

                  required: true,
            },
      },
      {
            toJSON: {
                  transform(doc, ret) {
                        ret.id = ret._id;
                        delete ret._id;
                        delete ret.__v;
                  },
            },
      },
);

OtpSchema.statics.build = (attrs: OtpAttrs) => {
      return new OTP(attrs);
};

const OTP = mongoose.model<AdminDoc, OtpModel>("OTP", OtpSchema);

export { OTP };
