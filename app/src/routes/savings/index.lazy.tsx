import { Saving } from "@/components/cards/Saving";
import { AddSavingAccount } from "@/components/dialogs/AddSavingAccount";
import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/savings/")({
  component: Savings,
});

function Savings() {
  const { data, refetch } = useQuery({
    queryKey: ["savings"],
    queryFn: async () =>
      honoClient.balance.savings.$get().then((res) => res.json()),
  });

  return (
    <div className="flex w-full flex-col gap-3 p-4">
      <AddSavingAccount refetch={refetch} />

      <div className="flex flex-wrap gap-3">
        {data?.map((saving) => (
          <Saving
            key={saving.id}
            id={saving.id}
            name={saving.name}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}
