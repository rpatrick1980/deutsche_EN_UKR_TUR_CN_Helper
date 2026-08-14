---
description: Migrate OpenAI calls from direct (user key) to a FastAPI proxy
argument-hint: [proxy base URL, optional]
---
Introduce a FastAPI proxy so the extension no longer needs each user's raw OpenAI
key, per `CLAUDE.md` §9. Keep the change minimal and transport-agnostic.

Proxy base URL (if provided): $ARGUMENTS

Do this:
1. **Extension side (primary change is one file):**
   - `src/services/openai.ts`: replace `OPENAI_ENDPOINT` with the proxy endpoint
     (e.g. `${PROXY_URL}/api/ai`), send `{ action, text, languages }` as the body,
     and REMOVE the `Authorization` header. Keep the same response shape
     (`{ ok, translations?, explanation?, error? }`) so nothing downstream changes.
   - Decide where prompts live: either keep building messages client-side and send
     them, or move `prompts.ts` logic server-side (preferred). If moved, keep a thin
     client that only sends action+text+languages.
   - `manifest.config.ts`: remove `host_permissions: https://api.openai.com/*` and add
     the proxy host. Update the Settings copy so the API-key field becomes optional or
     hidden when a proxy is configured.
2. **Backend (new):** scaffold a small FastAPI service with a single
   `POST /api/ai` endpoint that: validates German + word cap server-side (mirror
   `textExtraction.ts` rules), calls OpenAI with a server-held key from env, and
   returns the same JSON shape. Add rate limiting and basic abuse protection.
   Read the platform's integration guidance before writing any OpenAI/auth code.
3. Keep the direct-key path behind a build flag or setting if you want both modes.
4. Update `CLAUDE.md` §9 and `README.md` to reflect the proxy.

Verify the extension still builds (`yarn build`) and the panel still renders via the
demo build. Report the files changed and any env vars the proxy needs.
