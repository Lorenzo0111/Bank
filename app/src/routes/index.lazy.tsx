import { TransactionsTable } from "@/components/cards/Transactions";
import { useSession } from "@/components/contexts/SessionContext";
import { NewTransaction } from "@/components/dialogs/NewTransaction";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { session } = useSession();

  return (
    <div className="flex w-full flex-col gap-3 p-4">
      <div className="flex justify-between">
        <Card className="w-52">
          <CardHeader>
            <CardTitle>€{session?.balance || 0}</CardTitle>
            <CardDescription>Current balance</CardDescription>
          </CardHeader>
        </Card>

        <NewTransaction />
      </div>

      <TransactionsTable />
    </div>
  );
}
