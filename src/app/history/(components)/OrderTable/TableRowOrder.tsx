import { TableCell, TableRow } from "@bleu-fi/ui";
import { useState } from "react";

import { Checkbox } from "#/components/Checkbox";
import { TokenInfo } from "#/components/TokenInfo";
import { StopLossOrderType } from "#/hooks/useOrders";
import { ChainId } from "#/lib/publicClients";
import { IToken } from "#/lib/types";
import { capitalize, formatDateToLocalDatetime } from "#/utils";

import { CancelOrdersDialog } from "./CancelOrdersDialog";

interface ITableRowOrder {
  order: StopLossOrderType;
  ordersToCancel: string[];
  setOrdersToCancel: (orders: string[]) => void;
}

export function TableRowOrder({
  order,
  ordersToCancel,
  setOrdersToCancel,
}: ITableRowOrder) {
  const [rowIsSelected, setRowIsSelected] = useState(false);

  return (
    <>
      <TableRow key={order?.id}>
        <TableCell>
          <span className="sr-only"></span>
        </TableCell>
        <TableCell>
          <Checkbox
            id="select-row"
            onChange={() => {
              setRowIsSelected(!rowIsSelected);
              const newOrdersToCancel = !rowIsSelected
                ? [...ordersToCancel, order.hash]
                : ordersToCancel.filter(
                    (orderHash) => orderHash !== order.hash
                  );
              setOrdersToCancel(newOrdersToCancel);
            }}
            checked={rowIsSelected}
            aria-label="Select row"
            disabled={order?.status != "created" && order?.status != "posted"}
          />
        </TableCell>
        <TableCell>
          {formatDateToLocalDatetime(new Date(order?.blockTimestamp * 1000))}
        </TableCell>
        <TableCell>
          {order?.stopLossData?.tokenIn ? (
            <TokenInfo
              token={order?.stopLossData?.tokenIn as IToken}
              chainId={order?.chainId as ChainId}
            />
          ) : (
            "Error loading token"
          )}
        </TableCell>
        <TableCell>
          {order?.stopLossData?.tokenOut ? (
            <TokenInfo
              token={order?.stopLossData?.tokenOut as IToken}
              chainId={order?.chainId as ChainId}
            />
          ) : (
            "Error loading token"
          )}
        </TableCell>
        <TableCell>{capitalize(order?.status as string)}</TableCell>
        <TableCell>
          <CancelOrdersDialog
            tableRow
            ordersToCancel={[order.hash]}
            disabled={order?.status != "created" && order?.status != "posted"}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
