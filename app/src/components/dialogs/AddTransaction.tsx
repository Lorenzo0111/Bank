import { honoClient } from "@/lib/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

export function AddTransaction({
  children,
  target,
}: { children?: ReactNode; target?: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild={!children}>
        {children || <Button className="ml-auto w-1/4">New transaction</Button>}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription>
            Enter the details of the transaction you want to make.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = new FormData(e.target as HTMLFormElement);
            const targetValue = target || (form.get("target") as string);
            const amount = form.get("amount") as string;
            const description = form.get("description") as string;

            try {
              await honoClient.balance.transactions.new.$post({
                json: {
                  target: targetValue,
                  amount: Number.parseInt(amount),
                  description,
                },
              });

              queryClient.invalidateQueries();

              toast({
                title: "Transaction created",
                description: "The transaction was successfully created.",
              });
            } catch (e) {
              toast({
                title: "Transaction failed",
                description:
                  e instanceof Error
                    ? e.message
                    : "An error occurred, check the details and try again.",
                variant: "destructive",
              });
            }
          }}
        >
          <Input
            name="target"
            placeholder="Target Username"
            value={target}
            disabled={!!target}
            required
          />
          <Input name="amount" type="number" placeholder="Amount" required />
          <Textarea name="description" placeholder="(Optional) Description" />

          <DialogFooter>
            <Button>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
