import { UiComponent } from "~/ui/ui-component";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Plugin Test" },
    { name: "description", content: "Delay Plugin" },
  ];
}

export default function Home() {
  // return <UiComponent />;
}
