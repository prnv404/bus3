import { Password } from "@prnv404/bus3";
import mongoose, { Schema } from "mongoose";

export interface PassengertAttrs {
	name: string; //

	phone: string; //

	otp: string; //

	password: string; //

	district: string; //

	type: "student" | "regular";

	isVerified: boolean; //
	institution?: string;

	favBus: string[]; //

	favRoute: string[]; //

	age?: string; //

	favSchedule: string[]; //

	busPassId: string; //

	purchasedTickets: string[]; //

	currentTickets: string[]; //
}

interface PassengerModel extends mongoose.Model<PassengerDoc> {
	build(attrs: PassengertAttrs): PassengerDoc;
}

export interface PassengerDoc extends mongoose.Document {
	name: string;

	phone: string;

	otp: string;

	password: string;

	district?: string;

	type: "student" | "regular";

	isVerified: boolean;

	favBus: string[];

	favRoute: string[];

	age?: string;

	institution?: string;

	favSchedule: string[];

	busPassId: string;

	purchasedTickets: string[];

	currentTickets: string[];
}

const PassengerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		},

		phone: {
			type: String,
			require: true
		},

		otp: {
			type: String,
			require: true
		},

		password: {
			type: String,
			required: true
		},

		type: {
			type: String,
			required: true
		},

		isVerified: {
			type: Boolean,
			required: true
		},

		district: {
			type: String,
			required: true
		},

		age: {
			type: String
		},

		busPassId: {
			type: String
		},

		favBus: [
			{
				type: Schema.Types.ObjectId
			}
		],
		favRoute: [
			{
				type: Schema.Types.ObjectId
			}
		],
		favSchedule: [
			{
				type: Schema.Types.ObjectId
			}
		],
		purchasedTickets: [
			{
				type: Schema.Types.ObjectId
			}
		],
		currentTickets: [
			{
				type: Schema.Types.ObjectId
			}
		]
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			}
		}
	}
);

PassengerSchema.statics.build = (attrs: PassengertAttrs) => {
	return new PASSENGER(attrs);
};

PassengerSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));

		this.set("password", hashed);
	}

	done();
});

export const PASSENGER = mongoose.model<PassengerDoc, PassengerModel>("PASSENGER", PassengerSchema);
