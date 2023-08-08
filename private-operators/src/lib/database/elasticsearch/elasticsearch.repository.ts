import { ELASTIC_CLIENT } from "../../../config/elasticsear.config";

export const PUT_TO_ELASTIC = async (index: string, data: any) => {
	await ELASTIC_CLIENT.index({
		index,
		body: data
	});
};
