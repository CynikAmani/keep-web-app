import { Suspense } from "react";
import TodosManager from "@/components/app/todos/TodosManager";

export default function TodosPage() {
  return (
    <Suspense fallback={null}>
      <TodosManager />
    </Suspense>
  );
}
