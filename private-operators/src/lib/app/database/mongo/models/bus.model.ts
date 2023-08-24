import mongoose from "mongoose";
import { BusDTO } from "../../../../entites";

export interface BusAttrs {
	BusNo: string;
	type: string;
	operatorId: string;
	seats: number;
}

interface BusModel extends mongoose.Model<BusDoc> {
	build(attrs: BusDTO): BusDoc;
}

interface BusDoc extends mongoose.Document {
	BusNo: string;

	type: string;

	operatorId: string;

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

		operatorId: {
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
