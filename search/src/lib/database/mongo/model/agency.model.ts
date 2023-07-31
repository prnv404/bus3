import { Schema, Document, model } from "mongoose";

// Define interfaces for the data
interface IAgency extends Document {
	agency_id: string;
	agency_name: string;
	agency_url: string;
	agency_timezone: string;
}

const AgencySchema = new Schema<IAgency>({
	agency_id: {
		type: String,
		required: true
	},
	agency_name: {
		type: String,
		required: true
	},
	agency_url: {
		type: String,
		required: true
	},
	agency_timezone: {
		type: String,
		required: true
	}
});

export const AgencyModel = model<IAgency>("Agency", AgencySchema);
