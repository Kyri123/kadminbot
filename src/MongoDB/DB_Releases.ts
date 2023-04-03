import * as mongoose        from "mongoose";

export interface IMongoDB {
	_id: string,
	__v: number
}

export interface IDB_Releases extends IMongoDB {
	Hash: string,
	Created: Date
}

const Schema = new mongoose.Schema<IDB_Releases>({
	Hash: { type: String, default: "", unique: true },
	Created: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IDB_Releases>("kadmin_arklin2_releases", Schema);