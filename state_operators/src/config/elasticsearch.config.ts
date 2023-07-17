import { Client } from "@elastic/elasticsearch";

const client = new Client({
	node: "https://bus3-es-http:9200",
	auth: {
		username: "elastic",
		password: process.env.ELASTIC_PASSWORD!
	},
	ssl: {
		rejectUnauthorized: false
	}
});

export const PingElasticSearch = async () => {
	try {
		await client.ping();
		console.log("Connected To ElasticSearch");
	} catch (error) {
		console.log(error);
	}
};

export { client as ELASTIC_CLIENT };
