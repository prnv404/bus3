import mongoose, { Schema, Document } from "mongoose";

export interface IBusPass {
	passengerId: string;
	passengerName: string;
	type: "student" | "regular";
	isActive: boolean;
	startStop?: string;
	endStop?: string;
	balance: number;
}

interface IBuspassDoc {
	passengerId: string;
	passengerName: string;
	type: "student" | "regular";
	isActive: boolean;
	startStop?: string;
	endStop?: string;
	balance: number;
}

const BuspassSchema: Schema = new Schema({
	passengerId: { type: String, required: true },
	passengerName: { type: String, required: true },
	type: { type: String, enum: ["student", "regular"], required: true },
	isActive: { type: Boolean, required: true },
	startStop: { type: String },
	endStop: { type: String },
	balance: { type: Number, required: true }
});

const BuspassModel = mongoose.model<IBuspassDoc>("Buspass", BuspassSchema);

export default BuspassModel;
