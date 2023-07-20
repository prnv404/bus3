import mongoose from "mongoose";

export interface BusAttrs {
	BusNo: string;

	type: string;

	OperatorId: string;

	seats: number;
}

interface BusModel extends mongoose.Model<BusDoc> {
	build(attrs: BusAttrs): BusDoc;
}

interface BusDoc extends mongoose.Document {
	BusNo: string;

	type: string;

	OperatorId: string;

	seats: number;
}

const BusSchema = new mongoose.Schema(
	{
		BusNo: {
			type: String,

			required: true
		},

		type: {
			type: String,

			required: true
		},

		OperatorId: {
			type: String,
			required: true
		},

		seats: {
			type: Number,

			required: true
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

BusSchema.statics.build = (attrs: BusAttrs) => {
	return new Bus(attrs);
};

const Bus = mongoose.model<BusDoc, BusModel>("Bus", BusSchema);

export { Bus };
