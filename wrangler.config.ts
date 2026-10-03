// Build/tooling settings for the Wrangler dev-server implementation that `cf`
// delegates to. Worker configuration lives in `cloudflare.config.ts`.
import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
	build: {
		command: 'cargo install -q "worker-build@^0.7" && worker-build --release',
	},
	// This is a Rust Worker; there is no TypeScript source to type against.
	types: {
		generate: false,
	},
});
