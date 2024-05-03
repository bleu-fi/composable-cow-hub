"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@bleu-fi/ui";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Spinner } from "#/components/Spinner";
import { useOrder } from "#/contexts/ordersContext";

import { CancelOrdersDialog } from "../CancelOrdersDialog";
import { TableRowPendingOrder } from "./TableRowPendingOrder";
import { TableRowProcessedOrder } from "./TableRowProcessedOrder";

export function OrderTable() {
  const { orders, pendingOrders, loaded, reload } = useOrder();
  const [ordersToCancel, setOrdersToCancel] = useState<string[]>([]);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <div className="my-10 flex w-9/12 flex-col gap-y-5">
      <div className="flex items-center justify-between gap-x-8">
        <div className="flex justify-between w-full gap-1">
          <h1 className="text-3xl text-highlight">My Stop Loss Orders</h1>
          <div className="flex items-center gap-x-2">
            <CancelOrdersDialog
              ordersToCancel={ordersToCancel}
              disabled={ordersToCancel.length < 1}
            />
            <Button
              onClick={() => {
                reload({ showSpinner: true });
                setOrdersToCancel([]);
              }}
            >
              <span className="flex items-center gap-x-2">
                <ReloadIcon />
                <span>Reload</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-[520px] overflow-y-auto rounded-md">
        <Table className="bg-foreground border-0 text-black rounded-md">
          <TableHeader className="bg-primary">
            <TableCell className="rounded-tl-md">
              <span className="sr-only"></span>
            </TableCell>
            <TableCell>
              <span className="sr-only">Selected</span>
            </TableCell>
            <TableCell className="py-4">Tx Datetime</TableCell>
            <TableCell>Sell Token</TableCell>
            <TableCell>Buy Token</TableCell>
            <TableCell>Status</TableCell>
            <TableCell className="rounded-tr-md">
              <span className="sr-only">Cancel</span>
            </TableCell>
          </TableHeader>
          <TableBody>
            {pendingOrders?.map((order, id) => (
              <TableRowPendingOrder
                key={`pending-order-${id}`}
                id={`pending-order-${id}`}
                order={order}
              />
            ))}
            {orders?.map((order) => (
              <TableRowProcessedOrder
                key={order.id}
                order={order}
                setOrdersToCancel={setOrdersToCancel}
                ordersToCancel={ordersToCancel}
              />
            ))}
            {orders?.length + pendingOrders?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <h1 className="text-md text-slate12 m-2 text-center w-full">
                    This address doesn't have any Stop Loss orders associated to
                    it yet
                  </h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
