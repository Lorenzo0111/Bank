import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useSession } from "../contexts/SessionContext";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("asc");
  const { data } = useQuery({
    queryKey: ["transactions", query, sort],
    queryFn: () =>
      honoClient.balance.transactions
        .$get({
          query: {
            query: query.trim().length > 0 ? query : undefined,
            sort,
          },
        })
        .then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full justify-between">
        <Input
          placeholder="Search transactions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/3"
        />

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
            <TableRow
              key={transaction.id}
              className={
                transaction.targetId === session?.id
                  ? "bg-primary"
                  : "bg-destructive"
              }
            >
              <TableCell className="font-medium">
                {format(transaction.date, "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.description || "N/A"}</TableCell>
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
    </div>
  );
}
