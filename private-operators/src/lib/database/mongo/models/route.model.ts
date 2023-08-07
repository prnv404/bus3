import { Schema, Document, model } from "mongoose";

export interface IRoute extends Document {
	route_id: string;
	route_short_name: string;
	route_long_name: string;
	route_type: number;
}

const RouteSchema = new Schema<IRoute>({
	route_id: {
		type: String,
		required: true
	},
	route_short_name: {
		type: String,
		required: true
	},
	route_long_name: {
		type: String,
		required: true
	},
	route_type: {
		type: Number,
		required: true
	}
});

export const RouteModel = model<IRoute>("Stop", RouteSchema);
