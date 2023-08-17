import { autoInjectable } from "tsyringe";
import { OrderRepository } from "../database/repository/order.repository";
import { Iorder } from "../database/model/order.model";
import { ISuccessRazorpay } from "../controller/order.controller";
import { timeStamp } from "console";

@autoInjectable()
export class OrderService {
	constructor(private readonly repository: OrderRepository) {}

	async createOrder(data: Iorder) {
		const order = await this.repository.createOrder(data);
		return order;
	}

	async findById(id: string) {
		const order = await this.repository.findOrderBydId(id);
		return order;
	}

	async findOrderById(id: string) {
		return await this.repository.findOrderByPaymentId(id);
	}

	async findByPassenger(id: string) {
		const orders = await this.repository.findOrderByPassengerId(id);
		return orders;
	}

	async verifyPayment(data: ISuccessRazorpay) {
		const order = await this.repository.findOrderByOrderId(data.razorpay_order_id);
		if (order) {
			order.status = "ACCEPTED";
			order.razorpay_order_id = data.razorpay_order_id;
			order.razorpay_payment_id = data.razorpay_payment_id;
			order.razorpay_signature = data.razorpay_signature;
			await order.save();
			return order;
		}
	}

	async GetReports() {
		return await this.repository.GetReports();
	}
}
