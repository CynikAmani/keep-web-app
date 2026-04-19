import { Suspense } from "react";
import TodosManager from "@/features/todos/components/TodosManager";

export default function TodosPage() {
  return (
    <Suspense fallback={null}>
      <TodosManager />
    </Suspense>
  );
}
