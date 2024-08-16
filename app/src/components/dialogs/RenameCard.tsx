import { honoClient } from "@/lib/fetcher";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function RenameCard({
  number,
  name: defaultName,
  refetch,
}: {
  number: string;
  name: string;
  refetch?: () => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState(defaultName);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rename</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename card</DialogTitle>
          <DialogDescription>Enter a new name for the card</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="New name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={async () => {
                await honoClient.cards[":number"].$patch({
                  param: { number },
                  json: { name },
                });

                toast({
                  description: "Card renamed",
                });

                refetch?.();
              }}
            >
              Rename
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
