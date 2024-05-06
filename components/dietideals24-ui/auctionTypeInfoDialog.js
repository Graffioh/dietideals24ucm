import { Button } from "@/components/shadcn-ui/button";
import {
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
} from "@/components/shadcn-ui/alert-dialog";

import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function Component() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="none">
          <InfoCircledIcon width="22" height="22" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Fixed time auction</AlertDialogTitle>
        <AlertDialogDescription>
          The auction starts with a <a className="font-bold">start price</a>. If
          the expire date is reached and no bids
          have been placed, or the highest bid does not exceed the{" "}
          <a className="font-bold">reserve price</a>, the auction is considered
          failed. In any case, it ends once the <a className="font-bold">expire date</a> has been reached.
        </AlertDialogDescription>
        <AlertDialogTitle>English auction</AlertDialogTitle>
        <AlertDialogDescription>
          The auction starts with a <a className="font-bold">start price</a>,
          and bidding continues until the{" "}
          <a className="font-bold">offer timer</a> expires. To participate,
          bidders must submit offers that increase the current price by at least
          the <a className="font-bold">rise threshold price</a>, which is set at
          €X (e.g., if the current bid is €10 and the rise threshold is €5, the
          next bidder must offer at least €15 to be considered).
        </AlertDialogDescription>
        <AlertDialogTitle>Descending auction</AlertDialogTitle>
        <AlertDialogDescription>
          The auction start with a <a className="font-bold">start price</a>. From there, bidding continues
          until either a new offer is submitted or the auction reaches{" "}
          <a className="font-bold">end price</a>. The{" "}
          <a className="font-bold">decrement timer</a> counts down, and every
          time it expires, it resets and automatically lowers the current offer
          by a set <a className="font-bold">decrement amount</a>.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
