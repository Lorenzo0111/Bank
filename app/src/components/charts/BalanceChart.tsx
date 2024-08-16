import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { LineChart } from "../ui/chart-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function BalanceChart() {
  const [type, setType] = useState("day");

  const { data } = useQuery({
    queryKey: ["balance", "snapshots"],
    queryFn: async () =>
      honoClient.balance.snapshots.$get().then((res) => res.json()),
  });

  const chartData = useMemo(() => {
    const keys = Array.from(
      { length: type === "day" ? 30 : 12 },
      (_, i) => i + 1,
    );
    if (!data) return keys.map((key) => ({ [type]: key, balance: 0 }));

    const items = data.reduce(
      (acc, { date, balance }) => {
        console.log(date, balance);

        const key =
          type === "day" ? new Date(date).getDate() : new Date(date).getMonth();
        acc[key] = acc[key]
          ? Number(acc[key]) + Number(balance)
          : Number(balance);
        return acc;
      },
      Array(type === "day" ? 30 : 12),
    );

    for (let i = 0; i < items.length; i++) {
      if (items[i] === undefined) {
        let hasNext = false;
        for (let j = i + 1; j < items.length; j++) {
          if (items[j] !== undefined) {
            hasNext = true;
            break;
          }
        }

        if (!hasNext) break;

        items[i] = items[i - 1] || 0;
      }
    }

    return keys.map((key) => ({
      [type]: key,
      balance: items[key - 1],
    }));
  }, [data, type]);

  console.log(chartData);

  return (
    <LineChart
      title={
        <div className="flex w-full items-center justify-between">
          <h3 className="font-semibold text-xl">Balance over time</h3>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Days</SelectItem>
              <SelectItem value="month">Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
      data={chartData}
      keys={["balance"]}
      dataKey={type}
      config={{
        balance: {
          label: "Balance",
          color: "#16a34a",
        },
      }}
    />
  );
}
