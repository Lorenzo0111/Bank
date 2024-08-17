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

export function AddSavingAccount({
  refetch,
}: {
  refetch: () => void;
}) {
  const [name, setName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto w-1/4">Add account</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add account</DialogTitle>
          <DialogDescription>
            Create a saving account to save money
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={async () => {
                await honoClient.balance.savings.new.$post({
                  json: { name },
                });

                refetch();
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
