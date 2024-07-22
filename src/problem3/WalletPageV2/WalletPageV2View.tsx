import React from "react";
import isEqual from "react-fast-compare";

const WalletPageV2View = (props) => {
  const { children, sortedBalances, prices, ...rest } = props;

  const rows = sortedBalances.map((balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formattedAmount = balance.amount.toFixed(2);
    return (
      <WalletRow
        className={classes.row}
        key={`${balance.currency}-${index}`} // More stable key
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

export default React.memo(WalletPageV2View, isEqual);
