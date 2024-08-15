import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "../contexts/SessionContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function TransactionsTable() {
  const { session } = useSession();
  const { data } = useQuery({
    queryKey: ["transactions", session?.id],
    queryFn: () => honoClient.transactions.$get().then((res) => res.json()),
  });

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Source</TableHead>
          <TableHead className="text-right">Target</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.description ?? "N/A"}</TableCell>
            <TableCell className="text-right">
              {transaction.source.name}
            </TableCell>
            <TableCell className="text-right">
              {transaction.target.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
