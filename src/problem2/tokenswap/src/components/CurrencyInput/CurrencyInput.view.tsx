import styles from "./CurrencyInput.module.css";
import React from "react";
import tokenImages from "src/assets";
import { roundNumber } from "src/utils/formats";
import { IoIosArrowDown } from "react-icons/io";
import { ITokenType } from "src/models";
import clsx from "clsx";
import isEqual from "react-fast-compare";

interface ICurrencyInputProps {
  label?: string;
  tokenInfo?: ITokenType;
  id: string;
  value: string;
  type?: "text" | "number";
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectCurrency?: () => void;
}

const CurrencyInput: React.FC<ICurrencyInputProps> = ({
  label,
  tokenInfo,
  value,
  className,
  onSelectCurrency,
  onChange,
  ...props
}) => {
  const IconComponent = tokenInfo ? tokenImages[tokenInfo.currency] : null;

  const price = roundNumber(Number(tokenInfo?.price) * Number(value));

  return (
    <div className={styles.container}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <div className={styles.inputWrapper}>
        <div
          className={styles.currencyWrapper}
          onClick={onSelectCurrency}
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {IconComponent && (
            <div className={styles.currencyIcon}>
              <IconComponent width={24} height={24} />
            </div>
          )}
          <div className={styles.currencyName}>
            {tokenInfo ? tokenInfo.currency.toUpperCase() : "Select token"}
          </div>
          <IoIosArrowDown fill="#717A8C" size={16} />
        </div>
        <input
          className={clsx(styles.input, className)}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      <div className={styles.inputWrapper}>
        <span className={styles.price}></span>
        <span className={styles.price}>${price}</span>
      </div>
    </div>
  );
};

export default React.memo(CurrencyInput, isEqual)