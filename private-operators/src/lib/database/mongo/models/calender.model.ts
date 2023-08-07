import { Schema, Document, model } from "mongoose";

export interface CalendarInterface {
	service_id: string;
	monday: number;
	tuesday: number;
	wednesday: number;
	thursday: number;
	friday: number;
	saturday: number;
	sunday: number;
	start_date: string;
	end_date: string;
}

export interface ICalendar extends Document {
	service_id: string;
	monday: number;
	tuesday: number;
	wednesday: number;
	thursday: number;
	friday: number;
	saturday: number;
	sunday: number;
	start_date: string;
	end_date: string;
}

const CalendarSchema = new Schema<ICalendar>({
	service_id: {
		type: String,
		required: true
	},
	monday: {
		type: Number,
		required: true
	},
	tuesday: {
		type: Number,
		required: true
	},
	wednesday: {
		type: Number,
		required: true
	},
	thursday: {
		type: Number,
		required: true
	},
	friday: {
		type: Number,
		required: true
	},
	saturday: {
		type: Number,
		required: true
	},
	sunday: {
		type: Number,
		required: true
	},
	start_date: {
		type: String,
		required: true
	},
	end_date: {
		type: String,
		required: true
	}
});

export const CalendarModel = model<ICalendar>("Calendar", CalendarSchema);
