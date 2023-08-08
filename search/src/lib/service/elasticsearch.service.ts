import { ApiResponse, Client } from "@elastic/elasticsearch";

export class ElaticSearch {
	constructor(private readonly client: Client) {}

	public async SearchStop(stopname: string) {
		const { body } = (await this.client.search({
			index: "stop",
			body: {
				query: {
					match: {
						stop_name: {
							query: stopname,
							fuzziness: "auto"
						}
					}
				}
			}
		})) as ApiResponse;
		return body.hits.hits;
	}

	public async SearchTrip(startstop: string, endstop: string) {}
}
