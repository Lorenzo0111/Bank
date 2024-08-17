import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/savings")({
  component: Savings,
});

function Savings() {
  const _res = useQuery({
    queryKey: ["savings"],
    queryFn: async () =>
      honoClient.balance.savings.$get().then((res) => res.json()),
  });

  return <div className="flex w-full flex-col gap-3 p-4" />;
}
