/*--------------------------------------------------------------------------
| FONTS & TYPOGRAPHY
---------------------------------------------------------------------------*/
export const fontSans = "font-sans";

/*--------------------------------------------------------------------------
| BUTTONS - Base styles
---------------------------------------------------------------------------*/
const btnBase = "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const btnSm = `${btnBase} px-3 py-1.5 text-sm rounded-md`;
export const btnMd = `${btnBase} px-4 py-2 text-sm rounded-lg`;
export const btnLg = `${btnBase} px-6 py-3 text-base rounded-xl`;

/* Mobile-first responsive buttons */
export const btnResponsiveSm = `${btnBase} px-3 py-2 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-md min-h-10 sm:min-h-auto`;
export const btnResponsiveMd = `${btnBase} px-4 py-2.5 sm:px-4 sm:py-2 text-sm rounded-lg min-h-11 sm:min-h-auto`;
export const btnResponsiveLg = `${btnBase} px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl min-h-12 sm:min-h-auto w-full sm:w-auto`;

/*--------------------------------------------------------------------------
| BUTTONS - Primary variants (shadcn theme)
---------------------------------------------------------------------------*/
export const btnPrimarySm = `${btnSm} bg-primary text-primary-foreground hover:opacity-90`;
export const btnPrimaryMd = `${btnMd} bg-primary text-primary-foreground hover:opacity-90`;
export const btnPrimaryLg = `${btnLg} bg-primary text-primary-foreground hover:opacity-90`;

/*--------------------------------------------------------------------------
| BUTTONS - Secondary variants
---------------------------------------------------------------------------*/
export const btnSecondarySm = `${btnSm} bg-secondary text-secondary-foreground hover:opacity-90`;
export const btnSecondaryMd = `${btnMd} bg-secondary text-secondary-foreground hover:opacity-90`;
export const btnSecondaryLg = `${btnLg} bg-secondary text-secondary-foreground hover:opacity-90`;

/*--------------------------------------------------------------------------
| BUTTONS - Outline variants
---------------------------------------------------------------------------*/
export const btnOutlineSm = `${btnSm} border border-[var(--button-outline)]/30 bg-transparent hover:bg-[var(--button-outline)]/8 text-[var(--button-outline)]`;
export const btnOutlineMd = `${btnMd} border border-[var(--button-outline)]/30 bg-transparent hover:bg-[var(--button-outline)]/8 text-[var(--button-outline)]`;
export const btnOutlineLg = `${btnLg} border border-[var(--button-outline)]/30 bg-transparent hover:bg-[var(--button-outline)]/8 text-[var(--button-outline)]`;

export const btnOutlineResponsiveSm = `${btnResponsiveSm} border border-[var(--button-outline)]/30 bg-transparent hover:bg-[var(--button-outline)]/8 text-[var(--button-outline)] active:bg-[var(--button-outline)]/15`;
export const btnOutlineResponsiveMd = `${btnResponsiveMd} border border-[var(--button-outline)]/30 bg-transparent hover:bg-[var(--button-outline)]/8 text-[var(--button-outline)] active:bg-[var(--button-outline)]/15`;
export const btnOutlineResponsiveLg = `${btnResponsiveLg} border border-[var(--button-outline)]/30 bg-transparent hover:bg-[var(--button-outline)]/8 text-[var(--button-outline)] active:bg-[var(--button-outline)]/15`;

/*--------------------------------------------------------------------------
| BUTTONS - Brand variants
---------------------------------------------------------------------------*/
export const btnBrandSm = `${btnSm} bg-brand-dark text-white hover:bg-brand-dark/90`;
export const btnBrandMd = `${btnMd} bg-brand-dark text-white hover:bg-brand-dark/90`;
export const btnBrandLg = `${btnLg} bg-brand-dark text-white hover:bg-brand-dark/90`;

export const btnBrandResponsiveSm = `${btnResponsiveSm} bg-brand-dark text-white hover:bg-brand-dark/90 active:bg-brand-dark/80`;
export const btnBrandResponsiveMd = `${btnResponsiveMd} bg-brand-dark text-white hover:bg-brand-dark/90 active:bg-brand-dark/80`;
export const btnBrandResponsiveLg = `${btnResponsiveLg} bg-brand-dark text-white hover:bg-brand-dark/90 active:bg-brand-dark/80`;

/*--------------------------------------------------------------------------
| BUTTONS - Brand Outline variants
---------------------------------------------------------------------------*/
export const btnBrandOutlineSm = `${btnSm} border border-brand text-brand bg-transparent hover:bg-brand hover:text-white`;
export const btnBrandOutlineMd = `${btnMd} border border-brand text-brand bg-transparent hover:bg-brand hover:text-white`;
export const btnBrandOutlineLg = `${btnLg} border border-brand text-brand bg-transparent hover:bg-brand hover:text-white`;

export const btnBrandOutlineResponsiveSm = `${btnResponsiveSm} border border-brand text-brand bg-transparent hover:bg-brand hover:text-white active:bg-brand/90`;
export const btnBrandOutlineResponsiveMd = `${btnResponsiveMd} border border-brand text-brand bg-transparent hover:bg-brand hover:text-white active:bg-brand/90`;
export const btnBrandOutlineResponsiveLg = `${btnResponsiveLg} border border-brand text-brand bg-transparent hover:bg-brand hover:text-white active:bg-brand/90`;

/*--------------------------------------------------------------------------
| BUTTONS - Ghost variants
---------------------------------------------------------------------------*/
export const btnGhostSm = `${btnSm} bg-transparent hover:bg-accent text-foreground/80 hover:text-foreground`;
export const btnGhostMd = `${btnMd} bg-transparent hover:bg-accent text-foreground/80 hover:text-foreground`;
export const btnGhostLg = `${btnLg} bg-transparent hover:bg-accent text-foreground/80 hover:text-foreground`;

/*--------------------------------------------------------------------------
| BUTTONS - Destructive variants
---------------------------------------------------------------------------*/
export const btnDestructiveSm = `${btnSm} bg-destructive text-white hover:bg-destructive/90`;
export const btnDestructiveMd = `${btnMd} bg-destructive text-white hover:bg-destructive/90`;
export const btnDestructiveLg = `${btnLg} bg-destructive text-white hover:bg-destructive/90`;

export const btnDestructiveOutlineSm = `${btnSm} border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-white`;
export const btnDestructiveOutlineMd = `${btnMd} border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-white`;
export const btnDestructiveOutlineLg = `${btnLg} border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-white`;

/*--------------------------------------------------------------------------
| SEMANTIC ACTION BUTTONS (Intent-based)
---------------------------------------------------------------------------*/
export const btnCreate = `${btnMd} bg-emerald-600 text-white hover:bg-emerald-700 gap-2 shadow-sm`;
export const btnEdit = `${btnOutlineMd} border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 gap-2`;
export const btnDelete = `${btnGhostMd} text-destructive hover:bg-destructive/10 gap-2`;
export const btnView = `${btnGhostMd} text-foreground/70 hover:bg-accent gap-2`;
export const btnCancel = `${btnOutlineMd} border-border text-muted-foreground hover:bg-accent`;

/*--------------------------------------------------------------------------
| LAYOUTS / STACKS
---------------------------------------------------------------------------*/
export const containerPage = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
export const stackSm = "flex flex-col gap-2";
export const stackMd = "flex flex-col gap-4";
export const stackLg = "flex flex-col gap-6";
export const stackXl = "flex flex-col gap-8";

/* Mobile-responsive stacks */
export const stackResponsiveSm = "flex flex-col gap-2 sm:gap-2";
export const stackResponsiveMd = "flex flex-col gap-3 sm:gap-4";
export const stackResponsiveLg = "flex flex-col gap-4 sm:gap-6";
export const stackResponsiveXl = "flex flex-col gap-6 sm:gap-8";

/* Button groups for hero sections */
export const btnGroupResponsive = "flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto";
export const btnGroupResponsiveCenter = "flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center w-full sm:w-auto";

/*--------------------------------------------------------------------------
| CARDS
---------------------------------------------------------------------------*/
export const cardBase = "bg-card text-card-foreground rounded-lg border border-border shadow-sm p-4";
export const cardLg = `${cardBase} p-6`;
export const cardMd = `${cardBase} p-4`;
export const cardSm = `${cardBase} p-2`;

/*--------------------------------------------------------------------------
| TEXT & HEADINGS
---------------------------------------------------------------------------*/
export const headingHero = "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight";
export const headingLg = "text-xl sm:text-2xl font-semibold";
export const headingMd = "text-lg sm:text-xl font-medium";
export const headingSm = "text-base sm:text-lg font-medium";

export const textPrimary = "text-foreground";        
export const textSecondary = "text-muted-foreground";  
export const textTertiary = "text-foreground/70";
export const textBrand = "text-brand";
export const textDestructive = "text-destructive";

/*--------------------------------------------------------------------------
| BADGES & INDICATORS
---------------------------------------------------------------------------*/
export const badge = "inline-block px-2 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground";
export const badgeBrand = "inline-block px-2 py-1 text-xs font-medium rounded-full bg-brand/10 text-brand";
export const badgeDestructive = "inline-block px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive";

/*--------------------------------------------------------------------------
| FORM ELEMENTS
---------------------------------------------------------------------------*/
export const input = "w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none transition-all";
export const inputError = "w-full rounded-md border border-destructive bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-destructive";

/*--------------------------------------------------------------------------
| DIVIDERS
---------------------------------------------------------------------------*/
export const divider = "border-t border-border my-4";
export const dividerBrand = "border-t border-brand my-4";