import mongoose from "mongoose";

export interface ScheduleAttrs {
	name: string;

	BusNo: string;

	start: string;

	stop: string;

	route: string;

	depotCode: string;
}

interface ScheduleModel extends mongoose.Model<ScheduleDoc> {
	build(attrs: ScheduleAttrs): ScheduleDoc;
}

interface ScheduleDoc extends mongoose.Document {
	name: string;

	BusNo: string;

	start: string;

	stop: string;

	route: string;

	depotCode: string;
}

const ScheduleSchema = new mongoose.Schema({
	name: {
		type: String,

		required: true
	},

	BusNo: {
		type: String,

		required: true
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
	route: {
		type: String,

		required: true
	}
});

ScheduleSchema.statics.build = (attrs: ScheduleAttrs) => {
	return new Schedule(attrs);
};

const Schedule = mongoose.model<ScheduleDoc, ScheduleModel>("Schedule", ScheduleSchema);

export { Schedule };
