import { Suspense } from "react";
import ArchivesManager from "@/features/archives/components/ArchivesManager";

export default function ArchivesPage() {
  return (
    <Suspense fallback={null}>
      <ArchivesManager />
    </Suspense>
  );
}
