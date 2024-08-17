import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/savings/$id")({
  component: SavingAccount,
});

function SavingAccount() {
  const { id } = Route.useParams<{ id: string }>();

  return <p>{id}</p>;
}
