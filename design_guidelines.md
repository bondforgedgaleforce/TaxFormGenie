# Tax Form Assistance - Compact Design Guidelines

## Design Foundation
**Approach**: Material Design base + Stripe professionalism + TurboTax guided UX + Wise localization
**Principles**: Progressive disclosure, confidence through clarity, international-first, accessibility standard

## Typography

**Fonts**:
- Primary: Inter (multilingual support)
- Monospace: IBM Plex Mono (tax IDs, amounts)

**Scale**:
```
H1: text-4xl lg:text-5xl font-bold
H2: text-3xl lg:text-4xl font-semibold
H3: text-2xl font-semibold
H4: text-xl font-medium
Body Large: text-lg | Body: text-base
Small: text-sm | Caption: text-xs
```

**Special Cases**:
- Currency/Numbers: Monospace, tabular-nums
- Tax References: font-medium + subtle background
- Legal: text-sm leading-relaxed

## Layout

**Spacing**: Tailwind units - 2, 4, 8, 12, 16, 24
- Forms: p-2, gap-2 (micro) | p-4, p-8 (component)
- Sections: py-12, py-16, py-24
- Containers: px-4 md:px-8 lg:px-12

**Grids**:
- Form wizard: Single column max-w-3xl
- Dashboard: lg:grid-cols-2
- Tax cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Containers**: Form max-w-3xl | Marketing max-w-7xl | Text max-w-prose

## Components

### Navigation
**Header**: Sticky, min-h-16, backdrop-blur | Logo left, language/user right | Progress indicator embedded
**Stepper**: Horizontal (desktop) / Vertical (mobile) | States: completed (✓), current (pulse), upcoming (#)
**Sidebar**: Sticky, collapsible sections, active state = bg + left border

### Forms
**Inputs**: Label above, helper below, min-h-12 touch targets | Icon prefix for currency/tax IDs | Inline validation
**Selects**: Custom with search, flag icons (countries), grouped options, multi-select pills
**Radio/Checkbox**: Card-style for major decisions (min-h-16), standard for lists
**Date**: Calendar picker, localized formats, fiscal year support
**Currency**: Auto-format per locale, thousands separators, calculator helper

### Cards
**Info Cards**: rounded-lg, p-6, icon top, hover elevation | Title (text-xl semibold) + description
**Tax Form Cards**: shadow-lg, thumbnail/icon, form # + year, status badge, actions (Edit/Download/Delete)
**Alerts**: Info/Warning/Error/Success | Icon + title + description + optional action

### Data Display
**Tables**: Zebra striping, sticky headers, right-align numbers | Mobile: stack to definition list
**Comparisons**: Side-by-side (desktop), accordion (mobile), highlight differences
**Progress**: % complete bar, section checklist, subtle milestone animations

### Buttons
**Sizing**: Hero px-8 py-3 | Standard px-6 py-2.5 | font-medium rounded-lg
**Types**: Primary (filled), Secondary (outline), Tertiary (text-only)
**Groups**: Wizard (justify-between) | Forms (gap-4 flex-wrap)
**Floating**: Save progress fixed bottom-right (mobile), sticky sidebar (desktop)

### Overlays
**Modals**: Centered max-w-2xl (confirmations) | Full-screen (previews) | Sticky footer actions, backdrop blur
**Sidepanels**: Right-slide, w-full md:w-1/2 lg:w-1/3, help docs
**Toasts**: Top-right, 5s auto-dismiss, stackable gap-2

## Page Templates

### Landing
**Hero** (min-h-screen desktop): H1 "Simple, Accurate, Global" | Subhead (multi-language/country) | Dual CTA | Trust indicators | Hero image: professional w/ multilingual UI (16:9, right side desktop)
**Features** (py-24): 3-col grid md:grid-cols-3, icons + H3, p-8 text-center
**How It Works** (py-24): 4-step zigzag, large numbers, UI screenshots
**Countries** (py-16): Flag grid 4/6/8 cols, "View all 50+" expansion
**Trust** (py-24): 2-col security explanation + badges
**CTA** (py-32): Centered max-w-4xl, "No credit card required"
**Footer** (py-16): 4-col grid, language selector, legal

### Dashboard
**Structure**: Sidebar w-64 (desktop) / hamburger (mobile) | Main max-w-7xl mx-auto px-8
**Home**: Welcome header + Quick Actions cards + Active forms grid + Help sidebar (sticky)

### Form Wizard
**Layout**: Centered max-w-3xl, sticky stepper top, py-8 padding, sticky bottom actions (mobile), help sidebar (desktop only)
**Section**: Step # + title | Intro paragraph | Fields + "Why we ask" expandables | Auto-save indicator

### Preview/Review
**Split**: Left editable summary | Right PDF-style preview | Sync scroll | Download top-right

## Motion
Duration-300 for transitions | duration-500 for progress bars
- Fade-in: page transitions
- Slide: modal/sidepanel
- Success: scale + fade checkmarks
**Avoid**: scroll-triggered, hover scale

## Images
**Hero**: Professional diverse person, laptop w/ clean UI, blurred bg (16:9)
**Illustrations**: Flat, minimal, consistent style (empty states, onboarding, help)
**Flags**: SVG quality
**Previews**: Screenshot mockups w/ placeholder data

## Responsive
**Breakpoints**: sm(640) md(768) lg(1024) xl(1280)
**Mobile**: Stack columns <md, hide sidebars <lg (hamburger), min-h-12 touch targets, reduce padding (p-4 vs p-8)

## Localization
**RTL**: flex-row-reverse, text-right (Arabic, Hebrew)
**Text Expansion**: Allow 30%+ (German)
**Formats**: Locale-adaptive currency symbols, date formats (DD/MM vs MM/DD vs ISO), number separators (comma vs period)

## Accessibility
- Min contrast ratios (WCAG AA)
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus visible styles
- Screen reader helpers for complex components

---
**Critical Rules**:
✓ Single-column forms max-w-3xl for focus
✓ min-h-12 touch targets on interactive elements
✓ Inline validation with clear error messaging
✓ Progressive disclosure for complexity
✓ Auto-save with visible indicators
✗ No decorative animations
✗ No scroll hijacking
✗ No auto-playing content