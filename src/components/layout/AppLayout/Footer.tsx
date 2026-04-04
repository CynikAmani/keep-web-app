import { textSecondary, divider } from "@/config/uiClasses";

export function Footer() {
  return (
    <footer className="mt-auto px-6 py-10">
      <div className={divider} />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className={`${textSecondary} text-sm`}>
          © 2026 Keep Beta. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-brand transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand transition-colors">Terms</a>
          <a href="#" className="hover:text-brand transition-colors">Help</a>
        </div>
      </div>
    </footer>
  );
}