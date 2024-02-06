import { cowTokenList } from "@/lib/cowTokenList";
import { formatNumber } from "@/lib/data/formatNumber";
import { truncateAddress } from "@/lib/data/truncate";
import Image from "next/image";

export function TokenInfo({
  symbol,
  id,
  chainId,
  amount,
}: {
  symbol?: string | null;
  id?: string;
  chainId?: number;
  amount?: number | string;
}) {
  const tokenLogoUri = cowTokenList.find(
    (token) => token.address === id && token.chainId === chainId
  )?.logoURI;
  return (
    <div className="flex items-center gap-x-1">
      <div className="w-12">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-white p-1">
            <Image
              src={tokenLogoUri || "/assets/generic-token-logo.png"}
              className="rounded-full"
              alt="Token Logo"
              height={28}
              width={28}
              quality={100}
            />
          </div>
        </div>
      </div>
      {symbol ? symbol : truncateAddress(id)}{" "}
      {amount && `(${formatNumber(amount, 4, "decimal", "compact", 0.001)})`}
    </div>
  );
}
