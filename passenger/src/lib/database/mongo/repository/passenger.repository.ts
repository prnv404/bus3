import { PASSENGER, PassengertAttrs } from "../model/passenger.model";

export class PassengerRepository {
	constructor() {}

	async Create(data: PassengertAttrs) {
		const passenger = await PASSENGER.build(data).save();

		return passenger;
	}

	async findById(id: string) {
		const passenger = await PASSENGER.findById(id);

		return passenger;
	}

	async findByPhone(phone: string) {
		const passenger = await PASSENGER.findOne({ phone });
		return passenger;
	}

	async editProfile(id: string, data: PassengertAttrs) {
		const passenger = await PASSENGER.findById(id)!;

		if (passenger) {
			passenger.name = data.name || passenger.name;

			passenger.age = data.age || passenger.age;

			passenger.type = data.type || passenger.type;

			passenger.district = data.district || passenger.district;

			passenger.institution = data.institution || passenger.institution;
		}

		await passenger?.save();

		return passenger;
	}
}
