import { bindings, defineConfig, exports } from "cf/config";

export default defineConfig({
	worker: {
		name: "ripgit",
		compatibilityDate: "2026-03-18",
		entrypoint: "build/index.js",
		workersDev: false,
		env: {
			// Repo registry — tracks which repos exist per owner so the profile page
			// can list them. Populated on first successful push.
			// Create with: cf kv namespaces create --title REGISTRY
			// then fill the returned ID in below as `bindings.kv({ id: "..." })`.
			REGISTRY: bindings.kv(),
			REPOSITORY: bindings.durableObject({
				worker: "ripgit",
				exportName: "Repository",
			}),
		},
		exports: {
			Repository: exports.durableObject({ storage: "sqlite" }),
		},
		observability: {
			logs: {
				enabled: true,
				invocationLogs: true,
			},
		},
		limits: {
			cpuMs: 300_000,
		},
	},
});
