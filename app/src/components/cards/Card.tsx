import { honoClient } from "@/lib/fetcher";
import { RenameCard } from "../dialogs/RenameCard";
import { Button } from "../ui/button";

export type CardProps = {
  number: string;
  name: string;
  expiry: string;
  actions?: boolean;
  refetch?: () => void;
};

export function Card(props: CardProps) {
  return (
    <div className="flex h-44 w-80 flex-col rounded-xl border border-primary bg-secondary p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{props.name}</h2>

        {props.actions && (
          <div className="flex items-center gap-3">
            <RenameCard
              number={props.number}
              name={props.name}
              refetch={props.refetch}
            />

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
        )}
      </div>
      <p className="mt-auto font-light text-xl">
        {props.number.replace(/(\d{4})/g, "$1 ")}
      </p>
    </div>
  );
}
