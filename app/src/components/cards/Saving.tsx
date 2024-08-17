import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle } from "../ui/card";

export type SavingProps = {
  id: string;
  name: string;
  refetch?: () => void;
};

export function Saving(props: SavingProps) {
  return (
    <Link to={`/savings/${props.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-xl">{props.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
