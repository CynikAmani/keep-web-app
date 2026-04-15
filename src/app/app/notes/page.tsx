import { Suspense } from "react";
import NoteManager from "@/components/app/notes/NoteManager";

export default function NotesPage() {
  return (
    <Suspense fallback={null}>
      <NoteManager />
    </Suspense>
  );
}
