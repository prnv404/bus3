import OrderModel, { Iorder } from "../model/order.model";

export class OrderRepository {
	async createOrder(data: Iorder) {
		const order = await OrderModel.create(data);
		return order;
	}
	async findOrderByPassengerId(id: string) {
		const order = await OrderModel.findOne({ passengerId: id });
		return order;
	}
	async findOrderBydId(id: string) {
		const order = await OrderModel.findById(id);
		return order;
	}
	async findOrderByPaymentId(id: string) {
		const order = await OrderModel.findOne({ paymentId: id });
		return order;
	}

	async findOrderByOrderId(id: string) {
		const order = await OrderModel.findOne({ orderId: id });
		return order;
	}
}
