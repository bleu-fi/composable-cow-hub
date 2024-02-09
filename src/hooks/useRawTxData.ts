import {
  AllTransactionArgs,
  TransactionFactory,
} from "#/lib/transactionFactory";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";

export function useRawTxData() {
  const { safe, sdk } = useSafeAppsSDK();

  const sendTransactions = async (argsArray: AllTransactionArgs[]) => {
    const txs = argsArray.map((arg) => {
      return TransactionFactory.createRawTx(arg.type, arg);
    });
    await sdk.txs.send({ txs });
  };

  return { safe, sendTransactions };
}
