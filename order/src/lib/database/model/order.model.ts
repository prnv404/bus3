import mongoose, { Schema } from "mongoose";

export interface Iorder {
	passengerId: string;
	amount: number;
	busPassId: string;
	paymentId: string;
	orderId?: string;
	recipt?: string;
	status: "PENDING" | "ACCEPTED" | "FAILED";
	addBalance: boolean;
}

interface OrderDoc {
	passengerId: string;
	amount: number;
	busPassId: string;
	paymentId: string;
	recipt: string;
	orderId: string;
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
	status: "PENDING" | "ACCEPTED" | "FAILED";
	addBalance: boolean;
}

const OrderSchema: Schema = new Schema({
	passengerId: {
		type: String,
		required: true
	},
	busPassId: {
		type: String,
		required: true
	},
	paymentId: {
		type: String,
		required: true
	},
	orderId: {
		type: String
	},
	recipt: {
		type: String
	},
	amount: {
		type: Number,
		required: true
	},
	razorpay_payment_id: {
		type: String
	},
	razorpay_order_id: {
		type: String
	},
	status: {
		type: String,
		enum: ["FAILED", "PENDING", "ACCEPTED"]
	},
	razorpay_signature: {
		type: String
	},
	addBalance: {
		type: Boolean,
		required: true
	}
});

const OrderModel = mongoose.model<OrderDoc>("Order", OrderSchema);

export default OrderModel;
