import { PvtOperator, PvtOperatorAttrs } from "../models/pvt-operator.model";

export class PvtOperatorRepository {
	constructor() {}

	async Create(data: PvtOperatorAttrs) {
		const operator = await PvtOperator.build(data).save();

		return operator;
	}

	async findbyId(id: string) {
		const operator = await PvtOperator.findById(id);

		return operator;
	}

	async findbyPhone(phone: string) {
		const operator = await PvtOperator.findOne({ phone });
		return operator;
	}

	async findbyIdAndUpdate(id: string, data: PvtOperatorAttrs) {
		const operator = await PvtOperator.findByIdAndUpdate(id, data).exec();

		return operator;
	}

	async deleteBydId(id: string) {
		const operator = await PvtOperator.findByIdAndDelete(id);
		return operator;
	}
}
