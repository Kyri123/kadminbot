import * as mongoose       from "mongoose";
import { IGithubReleases } from "../Types/MongoDB";

const Schema = new mongoose.Schema<IGithubReleases>( {
	assets_url: { type: String },
	body: { type: String },
	created_at: { type: String },
	draft: { type: Boolean },
	html_url: { type: String },
	id: { type: Number, unique: true },
	name: { type: String },
	node_id: { type: String },
	prerelease: { type: Boolean },
	published_at: { type: String },
	tag_name: { type: String },
	target_commitish: { type: String },
	upload_url: { type: String },
	url: { type: String }
} );

export default mongoose.model<IGithubReleases>( "kadmin_github_releases", Schema );