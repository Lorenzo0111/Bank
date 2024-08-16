import { honoClient } from "@/lib/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "../contexts/SessionContext";
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

export function NewTransaction() {
  const { refetch } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/4">New transaction</Button>
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
            const target = form.get("target") as string;
            const amount = form.get("amount") as string;
            const description = form.get("description") as string;

            try {
              await honoClient.transactions.new.$post({
                json: {
                  target,
                  amount: Number.parseInt(amount),
                  description,
                },
              });

              refetch();
              queryClient.invalidateQueries({
                queryKey: ["transactions"],
              });

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
          <Input name="target" placeholder="Target Username" required />
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
