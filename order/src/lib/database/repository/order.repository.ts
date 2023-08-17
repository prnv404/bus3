import OrderModel, { Iorder } from "../model/order.model";

export class OrderRepository {
	async createOrder(data: Iorder) {
		const order = await OrderModel.create(data);
		return order;
	}
	async findOrderByPassengerId(id: string) {
		const order = await OrderModel.find({ passengerId: id });
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

	async GetReports() {
		const totalOrders = await OrderModel.countDocuments();

		const totalRevenueEarned = await OrderModel.aggregate([
			{
				$match: {
					status: "ACCEPTED"
				}
			},
			{
				$group: {
					_id: null,
					totalRevenue: { $sum: "$amount" }
				}
			}
		]);

		const averageOrderAmount = await OrderModel.aggregate([
			{
				$match: {
					status: "ACCEPTED"
				}
			},
			{
				$group: {
					_id: null,
					averageAmount: { $avg: "$amount" }
				}
			}
		]);

		return {
			totalOrders,
			totalRevenueEarned,
			averageOrderAmount
		};
	}
}
