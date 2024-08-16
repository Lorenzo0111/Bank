import { honoClient } from "@/lib/fetcher";
import { Button } from "../ui/button";

export type CardProps = {
  number: string;
  name: string;
  expiry: string;
  refetch?: () => void;
};

export function Card(props: CardProps) {
  return (
    <div className="flex h-40 w-72 flex-col rounded-xl border border-primary bg-secondary p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{props.name}</h2>
        <Button
          variant="destructive"
          onClick={() => {
            honoClient.cards[":number"]
              .$delete({
                param: { number: props.number },
              })
              .then(() => props.refetch?.());
          }}
        >
          Burn
        </Button>
      </div>
      <p className="mt-auto font-light text-xl">
        {props.number.replace(/(\d{4})/g, "$1 ")}
      </p>
    </div>
  );
}
