import mongoose from "mongoose";

export interface EmployeeAttrs {
	name: string;

	type: string;

	Operator: string;

	depotCode: string;

	phone: number;
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
	build(attrs: EmployeeAttrs): EmployeeDoc;
}

interface EmployeeDoc extends mongoose.Document {
	name: string;

	type: string;

	depotCode: string;

	Operator: string;

	phone: number;
}

const EmployeeSchema = new mongoose.Schema({
	name: {
		type: String,

		required: true
	},

	type: {
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

	phone: {
		type: Number,

		required: true
	}
});

EmployeeSchema.statics.build = (attrs: EmployeeAttrs) => {
	return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>("Employee", EmployeeSchema);

export { Employee };
