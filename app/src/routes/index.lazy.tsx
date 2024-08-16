import { TransactionsTable } from "@/components/cards/Transactions";
import { BalanceChart } from "@/components/charts/BalanceChart";
import { useSession } from "@/components/contexts/SessionContext";
import { NewTransaction } from "@/components/dialogs/NewTransaction";
import {
  Card,
  CardContent,
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
      <div className="flex w-full gap-3">
        <Card className="h-fit w-96">
          <CardHeader>
            <CardTitle>€{session?.balance || 0}</CardTitle>
            <CardDescription>Current balance</CardDescription>
          </CardHeader>

          <CardContent>
            <BalanceChart />
          </CardContent>
        </Card>

        <NewTransaction />
      </div>

      <TransactionsTable />
    </div>
  );
}
