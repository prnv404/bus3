import { Password } from "@prnv404/bus3";
import mongoose, { Schema } from "mongoose";

export interface PvtOperatorAttrs {
	name: string;

	phone: string;

	district: string;

	otp: string | null;

	isVerified?: boolean;

	buses?: string[];

	routes?: string[];
}

interface PvtOperatorModel extends mongoose.Model<PvtOperatorDoc> {
	build(attrs: PvtOperatorAttrs): PvtOperatorDoc;
}

interface PvtOperatorDoc extends mongoose.Document {
	name: string;

	phone: string;

	otp: string | null;

	isVerified: boolean;

	district: string;

	buses?: string[];

	routes?: string[];
}

const PvtOperatorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		},

		otp: {
			type: String,
			required: true
		},

		phone: {
			type: String,
			required: true
		},
		isVerified: {
			type: Boolean,
			required: true
		},

		district: {
			type: String,
			required: true
		},

		buses: [{ type: Schema.Types.ObjectId, ref: "Bus" }],

		routes: [{ id: String }]
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			}
		}
	}
);

PvtOperatorSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));

		this.set("password", hashed);
	}

	done();
});

PvtOperatorSchema.statics.build = (attrs: PvtOperatorAttrs) => {
	return new PvtOperator(attrs);
};

export const PvtOperator = mongoose.model<PvtOperatorDoc, PvtOperatorModel>("PvtOperator", PvtOperatorSchema);
