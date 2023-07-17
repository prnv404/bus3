import { ELASTIC_CLIENT } from "../../../../config/elasticsearch.config";

export class ElasticSearchRepository {
	constructor() {}

	async PushToElasticSearch(id: string, index: string, data: any) {
		try {
			const res = await ELASTIC_CLIENT.index({
				index,
				id: id.toString(),
				body: data
			});
			console.log(res);
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
			console.log("Edited IN Elastic Search");
		} catch (error) {
			console.log(error);
		}
	}
}
