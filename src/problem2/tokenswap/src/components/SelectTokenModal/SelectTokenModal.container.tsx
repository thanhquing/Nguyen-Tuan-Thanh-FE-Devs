import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import { ISelectTokenModalProps, ITokenType } from "src/models";
import { AmoutType } from "src/utils/enum";
import SelectTokenModalView from "./SelectTokenModal.view";

const SelectTokenModal: React.FC<ISelectTokenModalProps> = ({
  defaultTokens,
  modalInfo,
  setModalInfo,
  setCurrencyOfPay,
  setCurrencyOfReceive,
}) => {
  const tokensRef = useRef<ITokenType[]>(defaultTokens);
  const [listOfTokens, setListOfTokens] = useState<ITokenType[]>(defaultTokens);
  const [searchedToken, setSearchedToken] = useState<string>("");

  const searchedTokenDebounce = useCallback((token: string) => {
    setListOfTokens(
      tokensRef.current.filter((t) =>
        t.currency.toLowerCase().includes(token.toLowerCase())
      )
    );
  }, []);

  const onRequestClose = useCallback(() => {
    setModalInfo((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, [setModalInfo]);

  const handleSelectToken = useCallback(
    (tokenInfo: ITokenType) => {
      if (modalInfo.type === AmoutType.PAY) {
        setCurrencyOfPay(tokenInfo);
      } else {
        setCurrencyOfReceive(tokenInfo);
      }
      onRequestClose();
    },
    [setCurrencyOfPay, setCurrencyOfReceive, onRequestClose, modalInfo.type]
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchedToken(e.target.value);
  }, []);

  useEffect(() => {
    searchedTokenDebounce(searchedToken);
  }, [searchedToken, searchedTokenDebounce]);

  return (
    <SelectTokenModalView
      searchedToken={searchedToken}
      modalInfo={modalInfo}
      listOfTokens={listOfTokens}
      handleSelectToken={handleSelectToken}
      onRequestClose={onRequestClose}
      handleSearchChange={handleSearchChange}
    />
  );
};

export default SelectTokenModal;
