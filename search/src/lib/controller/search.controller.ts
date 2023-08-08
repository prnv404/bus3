import { currentUser, requireAuth } from "@prnv404/bus3";
import express, { Request, Response } from "express";
import { ElaticSearch } from "../service/elasticsearch.service";
import { ELASTIC_CLIENT } from "../../config/elastic.search.config";
const router = express.Router();

const Search = new ElaticSearch(ELASTIC_CLIENT);

router.get("/search", async (req: Request, res: Response) => {
	const { endstop, startstop } = req.query as { startstop: string; endstop: string };
	const result = await Search;
});

export { router as SearchRouter };
