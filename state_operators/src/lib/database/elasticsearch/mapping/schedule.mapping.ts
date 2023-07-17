const mapping = {
	properties: {
		name: {
			type: "text"
		},
		BusNo: {
			type: "keyword"
		},
		start: {
			type: "date"
		},
		stop: {
			type: "date"
		},
		route: {
			type: "keyword"
		},
		depotCode: {
			type: "keyword"
		},
		Operator: {
			type: "text"
		}
	}
};

export { mapping as ScheduleMapping };
