import { Admin, AdminAttrs } from "../../../app/database/mongo/models/admin.model";

export class AdminRepository {
	async create(data: AdminAttrs) {
		const doc = await Admin.build(data).save();

		return doc;
	}

	async findById(id: string) {
		const doc = await Admin.findById(id);
		return doc;
	}

	async findByPhone(phone: number) {
		const doc = await Admin.findOne({ phone });

		return doc;
	}

	async deletebyId(id: string) {
		const doc = await Admin.findByIdAndRemove(id);

		return doc;
	}
}
