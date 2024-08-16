import { honoClient } from "@/lib/fetcher";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function AddFriend({
  refetch,
}: {
  refetch: () => void;
}) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto w-1/4">Add friend</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
          <DialogDescription>
            Insert the username of the friend to add to your list.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={async () => {
                try {
                  const user = await honoClient.users.username[
                    ":username"
                  ].$get({
                    param: { username },
                  });

                  const res = await user.json();
                  if ("error" in res) throw new Error("User not found");

                  await honoClient.users.friends[":id"].$put({
                    param: { id: res.id },
                  });
                } catch (_) {
                  toast({
                    description: "User not found",
                    variant: "destructive",
                  });
                }

                refetch();
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
