import { AddFriend } from "@/components/dialogs/AddFriend";
import { AddTransaction } from "@/components/dialogs/AddTransaction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/friends")({
  component: Friends,
});

function Friends() {
  const { data, refetch } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await honoClient.users.friends.$get();
      const data = await res.json();

      if ("error" in data) throw new Error(data.error);

      return data;
    },
  });

  return (
    <div className="flex w-full flex-col gap-3 p-4">
      <AddFriend refetch={refetch} />

      <div className="flex flex-wrap gap-3">
        {data?.map((friend) => (
          <AddTransaction key={friend.id} target={friend.username}>
            <Card key={friend.id} className="w-52">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`${import.meta.env.VITE_API_URL}/users/${friend.id}/image`}
                    />
                    <AvatarFallback>
                      {friend.username.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span>{friend.username}</span>
                </CardTitle>
              </CardHeader>
            </Card>
          </AddTransaction>
        ))}
      </div>
    </div>
  );
}
