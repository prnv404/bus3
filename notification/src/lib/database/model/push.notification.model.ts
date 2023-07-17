import mongoose from "mongoose";

export interface PushNotificationAttrs {
	token: string;
	notification: {
		title: string;
		body: string;
	};
}

interface PushNotificationModel extends mongoose.Model<PushNotificationDoc> {
	build(attrs: PushNotificationAttrs): PushNotificationDoc;
}

interface PushNotificationDoc extends mongoose.Document {
	token: string;
	notification: {
		title: string;
		body: string;
	};
}

const PushNotificationSchema = new mongoose.Schema(
	{
		token: {
			type: String,

			required: true
		},

		notification: {
			title: {
				type: String,
				require: true
			},
			body: {
				type: String,
				require: true
			}
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			}
		}
	}
);

PushNotificationSchema.statics.build = (attrs: PushNotificationAttrs) => {
	return new PushNotification(attrs);
};

const PushNotification = mongoose.model<PushNotificationDoc, PushNotificationModel>("PushNotification", PushNotificationSchema);

export { PushNotification };
