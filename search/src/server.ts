import "dotenv/config";
import "express-async-errors";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";
import { PingElasticSearch } from "./config/elastic.search.config";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/search");
		await PingElasticSearch();
		app.listen(3000, () => {
			console.log("Server is Running on port 3000");
		})
			.on("error", async () => {})
			.on("close", async () => {});
	} catch (error) {
		console.log(error);
	}
})();
