import { bindings, defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "ripgit-auth",
		compatibilityDate: "2025-01-01",
		compatibilityFlags: ["nodejs_compat"],
		entrypoint: "src/index.ts",
		env: {
			// GitHub OAuth App client ID.
			// Create an app at https://github.com/settings/applications/new
			//   Homepage URL:            https://your-worker.workers.dev
			//   Authorization callback:  https://your-worker.workers.dev/oauth/callback
			//   (local dev callback:     http://localhost:8787/oauth/callback)
			GITHUB_CLIENT_ID: bindings.text("<your-app-id>"),

			// GitHub OAuth App client secret:
			//   cf workers secrets update GITHUB_CLIENT_SECRET --worker ripgit-auth
			GITHUB_CLIENT_SECRET: bindings.secret(),

			// Random secret for signing session cookies (any 32+ char string):
			//   cf workers secrets update SESSION_SECRET --worker ripgit-auth
			SESSION_SECRET: bindings.secret(),

			// KV namespace for OAuth token storage (workers-oauth-provider uses this).
			// Create it and fill in the returned ID:
			//   cf kv namespaces create --title OAUTH_KV
			OAUTH_KV: bindings.kv(),

			// Service binding to the ripgit worker.
			// `worker` must match `worker.name` in ripgit's cloudflare.config.ts.
			RIPGIT: bindings.worker({ worker: "ripgit" }),
		},
	},
});
