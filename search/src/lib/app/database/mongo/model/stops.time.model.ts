import { Schema, Document, model } from "mongoose";

export interface StopsTimeInterFace {
	trip_id: string;
	arrival_time: string;
	departure_time: string;
	stop_id: string;
	stop_sequence: number;
}

export interface IStopsTime extends Document {
	trip_id: string;
	arrival_time: string;
	departure_time: string;
	stop_id: string;
	stop_sequence: number;
}

const StopsTimeSchema = new Schema<IStopsTime>({
	trip_id: {
		type: String,
		required: true
	},
	arrival_time: {
		type: String,
		required: true
	},
	departure_time: {
		type: String,
		required: true
	},
	stop_id: {
		type: String,
		required: true
	},
	stop_sequence: {
		type: Number,
		required: true
	}
});

export const StopsTimeModel = model<IStopsTime>("StopsTime", StopsTimeSchema);
