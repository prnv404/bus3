import { Schema, Document, model } from "mongoose";

interface IStop extends Document {
	stop_id: string;
	stop_name: string;
	stop_lat: number;
	stop_lon: number;
}

const StopSchema = new Schema<IStop>({
	stop_id: {
		type: String,
		required: true
	},
	stop_name: {
		type: String,
		required: true
	},
	stop_lat: {
		type: Number,
		required: true
	},
	stop_lon: {
		type: Number,
		required: true
	}
});

export const StopModel = model<IStop>("Stop", StopSchema);
