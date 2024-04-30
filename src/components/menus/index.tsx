import { useNodes } from "reactflow";

import { useBuilder } from "#/contexts/builder";
import { INodeData } from "#/lib/types";

import { Spinner } from "../Spinner";
import { MintBalMenu } from "./MintBalMenu";
import { StopLossConditionMenu } from "./StopLossConditionMenu";
import { SwapMenu } from "./SwapMenu";

export default function Menu() {
  const nodeMenus = {
    stopLoss: StopLossConditionMenu,
    swap: SwapMenu,
    hookMintBal: MintBalMenu,
  };

  const { getOrderDataByOrderId } = useBuilder();
  const nodes = useNodes<INodeData>();

  const selected = nodes.find((node) => node.selected);

  if (
    !selected ||
    !selected.data ||
    !nodeMenus[selected?.type as keyof typeof nodeMenus]
  ) {
    return <DefaultMenu />;
  }
  const MenuComponent = nodeMenus[selected?.type as keyof typeof nodeMenus];
  const orderData = getOrderDataByOrderId(selected.data.orderId);

  if (!orderData) {
    return <Spinner />;
  }

  return (
    <div className="w-full max-h-[39rem] overflow-y-scroll">
      <div className="pr-3">
        <MenuComponent
          data={orderData}
          id={selected.id}
          defaultValues={selected.data}
        />
      </div>
    </div>
  );
}

function DefaultMenu() {
  return (
    <div className="flex flex-col w-full pr-3">
      <span className="text-lg font-bold text-highlight">Nodes menu</span>
      <p>Select a node to see the menu and edit the parameters</p>
      <br />
      <p>If you want to delete one order node, select it and press delete</p>
    </div>
  );
}
