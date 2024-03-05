"use client";

import { Spinner } from "#/components/Spinner";
import Table from "#/components/Table";
import { useUserOrders } from "#/hooks/useOrders";

import { TableRowOrder } from "./TableRowOrder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OrderTable() {
  const { orders, loaded } = useUserOrders();

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <Table
      color="blue"
      shade="darkWithBorder"
      classNames="overflow-y-auto max-h-[500px]"
    >
      <Table.HeaderRow>
        <Table.HeaderCell>
          <span className="sr-only"></span>
        </Table.HeaderCell>
        <Table.HeaderCell>Tx Datetime</Table.HeaderCell>
        <Table.HeaderCell>Sell Token</Table.HeaderCell>
        <Table.HeaderCell>Buy Token</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.HeaderRow>
      <Table.Body classNames="overflow-y-auto">
        {orders?.map((order) => <TableRowOrder key={order.id} order={order} />)}
        {orders?.length === 0 && (
          <Table.BodyRow>
            <Table.BodyCell colSpan={6}>
              <h1 className="text-md text-slate12 m-2 text-center w-full">
                This address didn't made any Stop Loss order yet
              </h1>
            </Table.BodyCell>
          </Table.BodyRow>
        )}
      </Table.Body>
    </Table>
  );
}
