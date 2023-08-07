import { ICalendar } from "../database/mongo/models/calender.model";
import { CalendarRepository } from "../database/mongo/repository/calender.repository"; // Import the repository

export class CalendarService {
	private calendarRepository: CalendarRepository;

	constructor() {
		this.calendarRepository = new CalendarRepository();
	}

	async createCalendar(data: ICalendar): Promise<ICalendar> {
		return this.calendarRepository.create(data);
	}

	async getCalendarById(id: string): Promise<ICalendar | null> {
		return this.calendarRepository.findById(id);
	}

	async getCalendarByServiceId(serviceId: string): Promise<ICalendar | null> {
		return this.calendarRepository.findByServiceId(serviceId);
	}

	async updateCalendar(id: string, data: ICalendar): Promise<ICalendar | null> {
		return this.calendarRepository.update(id, data);
	}

	async deleteCalendar(id: string): Promise<void> {
		await this.calendarRepository.delete(id);
	}
}
