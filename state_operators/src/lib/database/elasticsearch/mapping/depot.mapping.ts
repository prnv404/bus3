const mapping = {
	properties: {
		name: {
			type: "text"
		},
		depotCode: {
			type: "keyword"
		},
		district: {
			type: "text"
		},
		Operator: {
			type: "text"
		}
	}
};

export { mapping as DepotMapping };
