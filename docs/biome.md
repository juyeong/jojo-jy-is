# Biome rules

Biome's `all` preset enables every stable lint rule. All stable rule groups use error severity, and the Next.js, React, Tailwind, test, project, and types domains use `all`. Project and type analysis are enabled. Experimental `nursery` rules are explicitly excluded.

`npm run check` and `npm run lint` fail on warnings as well as errors. `npm run check:fix` applies automatic fixes and still fails if diagnostics remain.

## Framework exceptions

- Next.js pages/layouts and tool configuration files require default exports. Only those files are exempt from `noDefaultExport`.
- `next.config.ts` executes in Node.js, so Node builtin imports are allowed there.
- Next.js page/layout metadata is an allowed named export alongside components.
- The secret detector flags some generated shadcn class strings and public character alphabets. Those exact literals have documented inline suppressions; secret detection remains enabled elsewhere.
- Stateful UI tests await events in order so each assertion sees the completed update. Only those sequential awaits have documented `noAwaitInLoops` suppressions.

## TypeScript

Local imports include explicit file extensions. TypeScript permits them through `allowImportingTsExtensions` with `noEmit`; Next.js and Vitest handle bundling.
