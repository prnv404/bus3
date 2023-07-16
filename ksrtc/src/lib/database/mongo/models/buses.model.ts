import mongoose from "mongoose";

export interface BusAttrs {
	BusNo: string;

	type: string;

	depotCode: string;

	seats: number;
}

interface BusModel extends mongoose.Model<BusDoc> {
	build(attrs: BusAttrs): BusDoc;
}

interface BusDoc extends mongoose.Document {
	BusNo: string;

	type: string;

	depotCode: string;

	seats: number;
}

const BusSchema = new mongoose.Schema({
	BusNo: {
		type: String,

		required: true
	},

	type: {
		type: String,

		required: true
	},

	depotCode: {
		type: String,

		required: true
	},

	seats: {
		type: Number,

		required: true
	}
});

BusSchema.statics.build = (attrs: BusAttrs) => {
	return new Bus(attrs);
};

const Bus = mongoose.model<BusDoc, BusModel>("Bus", BusSchema);

export { Bus };
