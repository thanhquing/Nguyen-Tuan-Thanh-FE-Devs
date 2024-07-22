import { AmoutType } from "src/utils/enum";

export interface ITokenType {
  currency: string;
  price: number;
}

export interface IModalInfoType {
  type: AmoutType;
  isOpen: boolean;
}

export interface ISelectTokenModalProps {
  modalInfo: IModalInfoType;
  defaultTokens: ITokenType[];
  setModalInfo: React.Dispatch<React.SetStateAction<IModalInfoType>>;
  setCurrencyOfPay: React.Dispatch<React.SetStateAction<ITokenType>>;
  setCurrencyOfReceive: React.Dispatch<React.SetStateAction<ITokenType>>;
}
