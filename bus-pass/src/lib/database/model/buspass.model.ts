import mongoose, { Schema, Document } from "mongoose";

export interface IBusPass {
	passengerId: string;
	passengerName: string;
	type: "student" | "normal";
	isActive: boolean;
	startDate: string;
	endDate: string;
	startStop?: string;
	endStop?: string;
	balance: number;
}

interface IBuspassDoc extends Document {
	passengerId: string;
	passengerName: string;
	type: "student" | "normal";
	isActive: boolean;
	startDate: string;
	endDate: string;
	startStop?: string;
	endStop?: string;
	balance: number;
}

const BuspassSchema: Schema = new Schema({
	passengerId: { type: String, required: true },
	passengerName: { type: String, required: true },
	type: { type: String, enum: ["student", "normal"], required: true },
	isActive: { type: Boolean, required: true },
	startDate: { type: String, required: true },
	endDate: { type: String, required: true },
	startStop: { type: String },
	endStop: { type: String },
	balance: { type: Number, required: true }
});

const BuspassModel = mongoose.model<IBuspassDoc>("Buspass", BuspassSchema);

export default BuspassModel;
