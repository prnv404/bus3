import "dotenv/config";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { PingElasticSearch } from "./config/elasticsearch.config";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/ksrtc");

		await PingElasticSearch();

		app.listen(3000, () => {
			console.log("Server is Listening on port 3000");
		});
	} catch (error) {
		console.log(error);
	}
})();
