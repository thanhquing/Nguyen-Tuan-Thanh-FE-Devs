import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

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
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances]);

  const rows = sortedBalances.map((balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formattedAmount = balance.amount.toFixed(2)
    return (
      <WalletRow
        className={classes.row}
        key={`${balance.currency}-${index}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  // Filter out any invalid props for a <div>
  const { className, style, ...validRest } = rest;

  return (
    <div className={className} style={style} {...validRest}>
      {rows}
    </div>
  );
};

export default WalletPage;