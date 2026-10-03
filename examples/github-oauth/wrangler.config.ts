// Build/tooling settings for the Wrangler dev-server implementation that `cf`
// delegates to. Worker configuration lives in `cloudflare.config.ts`.
import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
	// Bindings are typed by hand in `src/types.ts`, so skip `.cloudflare/types`.
	types: {
		generate: false,
	},
});
