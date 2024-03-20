import { useState } from "react";

import { Checkbox } from "#/components/Checkbox";
import Table from "#/components/Table";
import { TokenInfo } from "#/components/TokenInfo";
import { StopLossOrderType } from "#/hooks/useOrders";
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
      <Table.BodyRow key={order?.id}>
        <Table.HeaderCell>
          <span className="sr-only"></span>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Checkbox
            id="select-row"
            onChange={() => {
              setRowIsSelected(!rowIsSelected);
              const newOrdersToCancel = !rowIsSelected
                ? [...ordersToCancel, order.hash]
                : ordersToCancel.filter(
                    (orderHash) => orderHash !== order.hash,
                  );
              setOrdersToCancel(newOrdersToCancel);
            }}
            checked={rowIsSelected}
            aria-label="Select row"
          />
        </Table.HeaderCell>
        <Table.BodyCell>
          {formatDateToLocalDatetime(new Date(order?.blockTimestamp * 1000))}
        </Table.BodyCell>
        <Table.BodyCell>
          <TokenInfo
            id={order?.stopLossParameters?.tokenIn?.address}
            symbol={order?.stopLossParameters?.tokenIn?.symbol}
            chainId={order?.chainId}
          />
        </Table.BodyCell>
        <Table.BodyCell>
          <TokenInfo
            id={order?.stopLossParameters?.tokenOut?.address}
            symbol={order?.stopLossParameters?.tokenOut?.symbol}
            chainId={order?.chainId}
          />
        </Table.BodyCell>
        <Table.BodyCell>{capitalize(order?.status as string)}</Table.BodyCell>
        <Table.BodyCell>
          <CancelOrdersDialog
            tableRow
            ordersToCancel={[order.hash]}
            disabled={order?.status != "created" && order?.status != "posted"}
          />
        </Table.BodyCell>
      </Table.BodyRow>
    </>
  );
}
