import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { connectToMongoDB } from "@prnv404/bus3";

(async () => {
	try {
		await connectToMongoDB("mongodb://mongo-srv:27017/pvt-operator");

		app.listen(3000, () => {
			console.log("Server is Listening on port 3000");
		});
	} catch (error) {
		console.log(error);
	}
})();