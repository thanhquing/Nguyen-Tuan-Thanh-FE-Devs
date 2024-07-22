import { useMemo } from "react";
import WalletPageV2 from ".";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added blockchain property for filtering
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  // Define any props you specifically expect
}

const WALLET_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => {
  return WALLET_PRIORITY[blockchain] || -99;
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0; // Combined conditions
      })
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)); // Simplified sorting
  }, [balances]);

  return (
    <WalletPageV2View
      sortedBalances={sortedBalances}
      prices={prices}
      {...rest}
    />
  );
};

export default WalletPage;
