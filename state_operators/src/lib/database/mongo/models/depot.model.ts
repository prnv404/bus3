import mongoose, { Schema } from "mongoose";

export interface DepotAttrs {
	name: string;

	depotCode: string;

	district: string;

	Operator: string;

	employees?: string[];

	buses?: string[];

	routes?: string[];
}

interface DepotModel extends mongoose.Model<DepotDoc> {
	build(attrs: DepotAttrs): DepotDoc;
}

interface DepotDoc extends mongoose.Document {
	name: string;

	depotCode: string;

	Operator: string;

	district: string;

	employees: string[];

	buses: string[];

	routes: string[];
}

const DepotSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		},

		Operator: {
			type: String,
			enum: ["KSRTC", "TNRTC", "MSTC", "BMTC"],
			require: true
		},

		depotCode: {
			type: String,
			require: true
		},

		district: {
			type: String,
			required: true
		},

		lat: {
			type: String,
			required: true
		},

		lng: {
			type: String,
			required: true
		},

		employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],

		buses: [{ type: Schema.Types.ObjectId, ref: "Bus" }],

		routes: [{ id: String }]
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

DepotSchema.statics.build = (attrs: DepotAttrs) => {
	return new Depot(attrs);
};

export const Depot = mongoose.model<DepotDoc, DepotModel>("DEPOT", DepotSchema);
