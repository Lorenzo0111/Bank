import { honoClient } from "@/lib/fetcher";
import { format } from "date-fns";
import type { InferResponseType } from "hono/client";
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
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function AddCard({ refetch }: { refetch: () => void }) {
  const [card, setCard] = useState<InferResponseType<
    typeof honoClient.cards.new.$post
  > | null>(null);

  return (
    <>
      <Button
        onClick={async () => {
          const res = await honoClient.cards.new.$post();
          const data = await res.json();

          setCard(data);

          refetch();
        }}
        className="ml-auto w-1/4"
      >
        Create card
      </Button>

      <Dialog
        open={!!card}
        onOpenChange={(open) => {
          if (!open) setCard(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Card created!</DialogTitle>
            <DialogDescription>
              Your card has been created successfully. Please save your details
              as you will not be able to view them again.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="number">Number</Label>
              <Input id="number" value={card?.number} readOnly />
            </div>

            <div className="flex justify-between gap-3">
              <div className="w-full">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" value={card?.cvc} readOnly />
              </div>

              <div className="w-full">
                <Label htmlFor="pin">PIN</Label>
                <Input id="pin" value={card?.pin} readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="expiry">Expiry</Label>
              <Input
                id="expiry"
                value={card?.expiry && format(card.expiry, "MM/yyyy")}
                readOnly
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
