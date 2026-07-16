---
name: Modern Atelier
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474b'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#75777c'
  outline-variant: '#c5c6cb'
  surface-tint: '#585f69'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#151c24'
  on-primary-container: '#7d848f'
  inverse-primary: '#c0c7d2'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1b'
  on-tertiary-container: '#838482'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce3ee'
  primary-fixed-dim: '#c0c7d2'
  on-primary-fixed: '#151c24'
  on-primary-fixed-variant: '#404751'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e3e2e0'
  tertiary-fixed-dim: '#c7c6c5'
  on-tertiary-fixed: '#1a1c1b'
  on-tertiary-fixed-variant: '#464746'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies the "Modern Atelier" aesthetic—a fusion of traditional bespoke craftsmanship and contemporary digital precision. It is built for a discerning audience that values heritage, attention to detail, and a seamless, high-trust digital experience.

The style is **Minimalist-Luxury**. It prioritizes expansive whitespace to allow high-resolution photography of fabrics and garments to take center stage. The interface uses thin, deliberate lines and a restrained color palette to evoke the feeling of a high-end physical studio. Visual noise is eliminated to reflect the calm, focused environment of a private fitting.

## Colors

The palette is rooted in the materials of the trade.
- **Primary (Midnight Charcoal):** Used for typography, navigation, and primary CTAs. It represents the ink of a tailor’s chalk and the authority of a well-cut suit.
- **Secondary (Muted Gold):** Used sparingly for accents, active states, and "Premium" indicators. It reflects brass hardware and silk linings.
- **Tertiary (Parchment White):** The primary background color. It is warmer than pure white, reducing eye strain and feeling more organic, like high-grade pattern paper.
- **Neutral (Slate Grey):** Used for borders, captions, and secondary information.

## Typography

This design system uses a high-contrast typographic pairing to bridge the gap between old-world editorial and modern SaaS.

**Libre Caslon Text** is used for all headlines and display text. Its classic proportions and elegant serifs communicate the brand's heritage. **Hanken Grotesk** is used for all functional text, body copy, and measurement forms. Its geometric clarity ensures readability during the technical parts of the user journey, such as inputting body measurements. 

Label styles should always be uppercase when used for navigation or section headers to add a formal, structured feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain an editorial, magazine-like feel. Content is centered within a 1280px container to ensure that high-quality garment imagery is never stretched or distorted.

- **Desktop:** 12-column grid with generous 64px outer margins to create an "airy" atmosphere.
- **Mobile:** 4-column grid with 16px margins. 
- **Rhythm:** Spacing follows an 8px base unit. Use larger gaps (64px+) between major sections to emphasize the premium nature of the brand; tight spacing should be avoided as it feels "discount" or cluttered.

## Elevation & Depth

This design system avoids heavy shadows, opting instead for **Tonal Layering** and **Low-Contrast Outlines**. 

- **Surface Tiers:** The base background is Tertiary (`#F9F8F6`). Cards and containers use pure White (`#FFFFFF`) to subtly lift off the page.
- **Borders:** Use 1px solid borders in a very light neutral (`#E5E5E5`) to define areas without creating visual weight.
- **Interaction Depth:** Only the primary CTA buttons receive a soft, ambient shadow (15% opacity, 20px blur, 4px offset) upon hover to provide a tactile "pressable" feel.

## Shapes

The shape language is architectural and crisp. We use **Soft (0.25rem)** rounding for standard elements like input fields and small buttons. Larger components, such as gallery cards, may use up to 0.5rem. 

The goal is to avoid the "bubbly" look of consumer apps while moving away from the aggressive sharpness of brutalism. Elements should feel like they were cut from fine fabric—precise and intentional.

## Components

### Buttons
- **Primary:** Solid Midnight Charcoal with White text. Rectangular with a 4px radius. 
- **Secondary:** Transparent background with a 1px Midnight Charcoal border.
- **Tertiary:** Text-only with a Muted Gold underline that expands on hover.

### Form Fields (Measurements)
Input fields are critical for the "Atelier" experience. They feature a floating label (Hanken Grotesk) and a bottom-border-only design by default, switching to a full 1px border on focus. This mimics the clean lines of a measurement ledger.

### Cards (Design Gallery)
Cards used for displaying clothing items should have a 0:1:0 ratio—no borders, no shadows, just the image. Details (Name, Price) appear in centered Libre Caslon Text below the image.

### Measurement Progress Indicator
A thin, horizontal line at the top of the screen using the Muted Gold color to show progress through the "Customization" or "Measurement" flow. It should be unobtrusive but clear.