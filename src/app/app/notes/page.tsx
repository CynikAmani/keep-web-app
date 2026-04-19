import { Suspense } from "react";
import NoteManager from "@/features/notes/components/NoteManager";

export default function NotesPage() {
  return (
    <Suspense fallback={null}>
      <NoteManager />
    </Suspense>
  );
}
