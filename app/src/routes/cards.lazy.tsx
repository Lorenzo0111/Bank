import { Card } from "@/components/cards/Card";
import { AddCard } from "@/components/dialogs/AddCard";
import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/cards")({
  component: Cards,
});

function Cards() {
  const { data, refetch } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => honoClient.cards.$get().then((res) => res.json()),
  });

  return (
    <div className="flex w-full flex-col gap-3 p-4">
      <AddCard />

      <div className="flex flex-wrap gap-3">
        {data?.map((card) => (
          <Card
            key={card.number}
            number={card.number}
            name={card.name}
            expiry={card.expiry}
            actions
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}
