import styles from "./App.module.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput.view";
import Spinner from "./components/Spinner/Spinner.view";
import { roundNumber } from "./utils/formats";
import { sleep } from "./utils/async-timer";
import { IModalInfoType, ITokenType } from "./models";
import { LuArrowUpDown } from "react-icons/lu";
import SelectTokenModal from "./components/SelectTokenModal/SelectTokenModal.container";
import clsx from "clsx";
import { AmoutType } from "./utils/enum";
import { uniqueBy } from "./utils/uniqueBy";
import { SELECT_CURRENCY_DEFAULT } from "./utils/constant";

function App() {
  const [listOfTokens, setListOfTokens] = useState<ITokenType[]>([]);
  const [payValue, setPayValue] = useState<number>(0);
  const [receiveValue, setReceiveValue] = useState<number>(0);
  const [currencyOfPay, setCurrencyOfPay] = useState<ITokenType>({
    currency: SELECT_CURRENCY_DEFAULT,
    price: 0,
  });
  const [currencyOfReceive, setCurrencyOfReceive] = useState<ITokenType>({
    currency: SELECT_CURRENCY_DEFAULT,
    price: 0,
  });
  const [modalInfo, setModalInfo] = useState<IModalInfoType>({
    type: AmoutType.PAY,
    isOpen: false,
  });
  const [typeOfInputFocus, setTypeOfInputFocus] = useState<AmoutType>(
    AmoutType.PAY
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Memoize the calculated exchange rate
  const exchangeRate = useMemo(() => {
    if (!currencyOfReceive.currency) return 0;
    return currencyOfPay.price / currencyOfReceive.price;
  }, [
    currencyOfPay.price,
    currencyOfReceive.price,
    currencyOfReceive.currency,
  ]);

  const handleChangePayValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setPayValue(value);
      setReceiveValue(roundNumber(value * exchangeRate));
      setTypeOfInputFocus(AmoutType.PAY);
    }
  }, [exchangeRate]);

  const handleChangeReceiveValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setReceiveValue(value);
      setPayValue(roundNumber(value / exchangeRate));
      setTypeOfInputFocus(AmoutType.RECEIVE);
    }
  }, [exchangeRate]);

  const handleSwapToken = useCallback(async () => {
    setLoading(true);
    await sleep(2000);
    setLoading(false);
    alert("Swap successfully");
  }, []);

  const fetchTokens = useCallback(async () => {
    try {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data = await response.json();
      const uniqueTokens = uniqueBy(data, (a, b) => a.currency === b.currency);
      setListOfTokens(uniqueTokens);

      const defaultToken = uniqueTokens.find(
        (v: ITokenType) => v.currency === SELECT_CURRENCY_DEFAULT
      );
      if (!defaultToken) return;
      setCurrencyOfPay(defaultToken);
      setCurrencyOfReceive(defaultToken);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setListOfTokens([]);
    }
  }, []);

  // Update input values when exchange rate changes
  useEffect(() => {
    if (typeOfInputFocus === AmoutType.PAY) {
      setReceiveValue(roundNumber(payValue * exchangeRate));
    } else {
      setPayValue(roundNumber(receiveValue / exchangeRate));
    }
  }, [exchangeRate, typeOfInputFocus, payValue, receiveValue]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.blockSwapWrapper}>
          <h5 className={styles.title}>MEGASwap</h5>
          <div className={styles.inputGroup}>
            <CurrencyInput
              id="pay"
              type="number"
              value={String(payValue)}
              tokenInfo={currencyOfPay}
              onChange={handleChangePayValue}
              onSelectCurrency={() =>
                setModalInfo({ type: AmoutType.PAY, isOpen: true })
              }
            />
            <CurrencyInput
              id="receive"
              type="number"
              value={String(receiveValue)}
              tokenInfo={currencyOfReceive}
              onChange={handleChangeReceiveValue}
              onSelectCurrency={() =>
                setModalInfo({ type: AmoutType.RECEIVE, isOpen: true })
              }
            />
            <div className={styles.switchIcon}>
              {loading ? <Spinner /> : <LuArrowUpDown size={22} />}
            </div>
          </div>
          <button
            className={clsx(
              styles.buttonSwap,
              loading && styles.buttonSwapLoading
            )}
            disabled={loading}
            onClick={handleSwapToken}
          >
            {loading ? "Swapping..." : "Swap"}
          </button>
        </div>
      </div>
      {modalInfo.isOpen && listOfTokens.length && (
        <SelectTokenModal
          defaultTokens={listOfTokens}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
          setCurrencyOfPay={setCurrencyOfPay}
          setCurrencyOfReceive={setCurrencyOfReceive}
        />
      )}
    </>
  );
}

export default App;
