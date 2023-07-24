import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/passenger");

		app.listen(3000, () => {
			console.log("Server is Listening on port 3000");
		})
			.on("error", async () => {})
			.on("close", async () => {});
	} catch (error) {
		console.log(error);
	}
})();
