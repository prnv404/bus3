import { ELASTIC_CLIENT } from "../../../../config/elasticsearch.config";

export class ElasticSearchRepository {
	constructor() {}

	async AddDoc(id: string, index: string, data: any) {
		try {
			await ELASTIC_CLIENT.index({
				index,
				id: id.toString(),
				body: data
			});
			console.log("ADDED IN Elastic Search");
		} catch (error) {
			console.log(error);
		}
	}

	async UpdateDoc(id: string, index: string, data: any) {
		try {
			await ELASTIC_CLIENT.update({
				index,
				id,
				body: {
					doc: data
				}
			});
			console.log("EDITED IN Elastic Search");
		} catch (error) {
			console.log(error);
		}
	}

	async DeleteDoc(id: string, index: string) {
		await ELASTIC_CLIENT.delete({
			index,
			id: id.toString()
		});
		console.log("DELETED IN Elastic Search");
	}
}
