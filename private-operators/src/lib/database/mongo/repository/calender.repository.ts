import { ICalendar, CalendarModel } from "../models/calender.model";

export class CalendarRepository {
	async create(data: ICalendar): Promise<ICalendar> {
		return CalendarModel.create(data);
	}

	async findById(id: string): Promise<ICalendar | null> {
		return CalendarModel.findById(id).exec();
	}

	async findByServiceId(serviceId: string): Promise<ICalendar | null> {
		return CalendarModel.findOne({ service_id: serviceId }).exec();
	}

	async update(id: string, data: ICalendar): Promise<ICalendar | null> {
		return CalendarModel.findByIdAndUpdate(id, data, { new: true }).exec();
	}

	async delete(id: string): Promise<void> {
		await CalendarModel.findByIdAndDelete(id).exec();
	}
}
