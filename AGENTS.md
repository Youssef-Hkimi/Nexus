<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Nexus agent instructions

You are working on **Nexus**, a Discord server/bot discovery demo.

## Read these first (in order)

1. `PROJECT_CONTEXT.md` — product vision and routes  
2. `DESIGN_SYSTEM.md` — colors, HeroUI rules, banner/card rules  
3. `CURRENT_STATE.md` — what already exists  
4. `TODO_NEXT.md` — real next work + **do-not-redo** completed items  
5. `AI_WORKLOG.md` — past failures and permanent fixes  

## Non-negotiables

- **HeroUI v3** components for UI; lucide-react icons; **no emoji icons**
- Soft dark mode (`#2D2E33` / `#323339`), brand `#629BF8` / `#82B0F9`
- Mock data only unless the user asks for backend
- Minimal scoped changes — do not rebuild the whole site
- Server detail: **no** reviews, gallery, or rules; **Like** not Save; banner sharp with **tiny** bottom fade only
- Checkboxes/Switches: Control **inside** Content
- Never nest `Button` inside `Dropdown.Trigger`
- Avoid `Tabs.Indicator` (SharedElement crash) unless transition provider is configured
- Use `LinkButton` for navigation-as-button

## Commands

```bash
cd C:\Users\noste\nexus
npm run dev -- -p 3010
npx tsc --noEmit
npm run build
```
