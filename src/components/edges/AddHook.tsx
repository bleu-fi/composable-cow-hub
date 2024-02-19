import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import React, { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  Node,
  useReactFlow,
} from "reactflow";
import { Address } from "viem";

import { INodeData, IToken } from "#/lib/types";

import { getLayoutedNodes } from "../Board";
import Button from "../Button";
import { Dialog } from "../Dialog";
import { defaultNodeProps } from "../nodes";
import { getDefaultMultiSendData } from "../nodes/MultiSendNode";
import { defaultEdgeProps } from ".";

export const MAX_NODES = 7;

export function AddHook({
  id,
  source,
  sourceX,
  sourceY,
  target,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [open, setOpen] = useState(false);

  const { setEdges, setNodes, getNodes, getEdges } = useReactFlow();
  const {
    safe: { safeAddress },
  } = useSafeAppsSDK();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const setNodesAndEdges = (newNode: Node<INodeData>) => {
    const oldNodes = getNodes();
    const targetIndex = oldNodes.findIndex((n) => n.id === target);
    const newNodes = getLayoutedNodes([
      ...oldNodes.slice(0, targetIndex),
      newNode,
      ...oldNodes.slice(targetIndex),
    ]);
    const edgesType = newNodes.length >= MAX_NODES ? "straight" : "addHook";
    const newEdges = [
      ...getEdges().filter((e) => e.id !== id),
      {
        id: `${source}-${newNode.id}`,
        source,
        target: newNode.id,
        ...defaultEdgeProps,
      },
      {
        id: `${newNode.id}-${target}`,
        source: newNode.id,
        target,
        ...defaultEdgeProps,
      },
    ].map((e) => ({ ...e, type: edgesType }));
    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Dialog
            content={
              <ChooseHookDialog
                setNodesAndEdges={setNodesAndEdges}
                target={target}
                safeAddress={safeAddress as Address}
              />
            }
            isOpen={open}
            setIsOpen={setOpen}
            title="Choose the hook to add"
          >
            <button
              className="bg-slate9 hover:bg-slate7 rounded-full text-xs size-3 text-center leading-3"
              onClick={() => setOpen(true)}
            >
              +
            </button>
          </Dialog>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export function ChooseHookDialog({
  setNodesAndEdges,
  target,
  safeAddress,
}: {
  setNodesAndEdges: (node: Node<INodeData>) => void;
  target: string;
  safeAddress: Address;
}) {
  const { getNodes, getNode } = useReactFlow();
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        onClick={() => {
          const targetNode = getNode(target) as Node<INodeData>;
          const swapNode = getNode("swap") as Node<INodeData>;
          const targetIndex = getNodes().findIndex((n) => n.id === target);
          const swapNodeIndex = getNodes().findIndex((n) => n.id === "swap");
          const isBeforeSwap = targetIndex <= swapNodeIndex;
          const newNodeId = `${Math.random().toString(36).substring(7)}`;
          if (!targetNode || !("tokenSell" in swapNode.data)) return;
          const newNode = {
            id: `${isBeforeSwap ? "preHook" : "postHook"}-${newNodeId}`,
            type: "hookMultiSend",
            data: getDefaultMultiSendData(
              swapNode.data.tokenSell as IToken,
              safeAddress as Address
            ),
            ...defaultNodeProps,
          };
          setNodesAndEdges(newNode);
        }}
        className="p-2"
      >
        Multisend
      </Button>
      <Button className="p-2" disabled>
        Aave withdraw
      </Button>
      <Button className="p-2" disabled>
        Claim vesting
      </Button>
      <Button className="p-2" disabled>
        Exit pool
      </Button>
    </div>
  );
}
