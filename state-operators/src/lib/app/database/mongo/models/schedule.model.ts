import mongoose from "mongoose";

export interface ScheduleAttrs {
	name: string;

	BusNo: string;

	start: string;

	stop: string;

	route: string;

	depotCode: string;

	Operator: string;

	driver?: string;

	conductor?: string;
}

interface ScheduleModel extends mongoose.Model<ScheduleDoc> {
	build(attrs: ScheduleAttrs): ScheduleDoc;
}

interface ScheduleDoc extends mongoose.Document {
	name: string;

	BusNo: string;

	Operator: string;

	start: string;

	stop: string;

	route: string;

	depotCode: string;

	driver?: string;

	conductor?: string;
}

const ScheduleSchema = new mongoose.Schema(
	{
		name: {
			type: String,

			required: true
		},

		BusNo: {
			type: String,

			required: true
		},

		Operator: {
			type: String,
			enum: ["KSRTC", "TNRTC", "MSTC", "BMTC"],
			require: true
		},

		depotCode: {
			type: String,

			required: true
		},

		start: {
			type: String,

			required: true
		},

		stop: {
			type: String,

			required: true
		},

		driver: {
			type: String
		},

		conductor: {
			type: String
		},

		route: {
			type: String
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

ScheduleSchema.statics.build = (attrs: ScheduleAttrs) => {
	return new Schedule(attrs);
};

const Schedule = mongoose.model<ScheduleDoc, ScheduleModel>("Schedule", ScheduleSchema);

export { Schedule };
