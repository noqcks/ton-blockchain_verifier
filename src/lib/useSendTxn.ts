import { useMutation } from "@tanstack/react-query";
import BN from "bn.js";
import { useState } from "react";
import { Address, Cell, toNano } from "ton";
import { useWalletConnect } from "./useWalletConnect";

export function useSendTXN(to: Address, value: BN, message: Cell) {
  const { requestTXN } = useWalletConnect();
  const [txnStatus, setTxnStatus] = useState<
    | "pending"
    | "success"
    | "rejected"
    | "expired"
    | "invalid_session"
    | "not_issued"
    | "unknown"
  >("not_issued");

  const m = useMutation(async () => {
    setTxnStatus("pending");

    const txnResp = await requestTXN(to.toFriendly(), value, message);

    console.log(txnResp, "SHAHAR")

    if (txnResp === undefined) {
      setTxnStatus("unknown");
    }

    setTxnStatus(txnResp!.type);
  });

  return {
    mutate: m.mutate,
    data: { status: txnStatus },
  };
}
