import { Schema, Document, model } from "mongoose";

export interface ITrip extends Document {
	route_id: string;
	service_id: string;
	trip_id: string;
	busNo: string;
}

const TripSchema = new Schema<ITrip>({
	busNo: {
		type: String,
		required: true
	},
	route_id: {
		type: String,
		required: true
	},
	service_id: {
		type: String,
		required: true
	},
	trip_id: {
		type: String,
		required: true
	}
});

export const TripModel = model<ITrip>("Trip", TripSchema);