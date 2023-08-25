import mongoose from "mongoose";

export interface TicketAttrs {
	busNo: string;

	price: number;

	OperatorId: string;

	route: string;

	from: string;

	to: string;

	depotCode?: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
	build(attrs: TicketAttrs): TicketDoc;
}

interface TicketDoc extends mongoose.Document {
	busNo: string;

	price: number;

	OperatorId: string;

	route: string;

	from: string;

	to: string;

	depotCode: string;
}

const TicketSchema = new mongoose.Schema(
	{
		busNo: {
			type: String,

			required: true
		},

		route: {
			type: String,

			required: true
		},

		depotCode: {
			type: String,

			required: true
		},

		price: {
			type: Number,

			required: true
		},

		OperatorId: {
			type: String,
			required: true
		},

		from: {
			type: String,

			required: true
		},

		to: {
			type: String,

			required: true
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			}
		},
		timestamps: true
	}
);

TicketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", TicketSchema);

export { Ticket };
