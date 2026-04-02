/**
--------------------------------------------------------------------------
| Utility function to navigate to a different URL in the browser.
--------------------------------------------------------------------------
 */
export const navigateTo = (path: string): void => {
  if (typeof window === "undefined") return

  window.location.href = path
}