import styles from "./SelectTokenModal.module.css";
import ReactModal, { Styles } from "react-modal";
import React from "react";
import tokenImages from "src/assets";
import VirtualList from "rc-virtual-list";
import { IModalInfoType, ITokenType } from "src/models";
import isEqual from "react-fast-compare";

const customModalStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    background: "rgb(19, 19, 19)",
    color: "#fff",
    borderRadius: 20,
    width: 472,
    padding: 0,
  },
  overlay: {
    background: "rgba(0,0,0,0.5)",
  },
};

const CONTAINER_HEIGHT = 320;
const ITEM_HEIGHT = 36;

interface ISelectTokenModalViewProps {
  modalInfo: IModalInfoType;
  searchedToken: string;
  listOfTokens: ITokenType[];
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSelectToken: (token: ITokenType) => void;
}

const SelectTokenModal: React.FC<ISelectTokenModalViewProps> = ({
  modalInfo,
  searchedToken,
  listOfTokens,
  handleSearchChange,
  onRequestClose,
  handleSelectToken,
}) => {
  return (
    <ReactModal
      isOpen={modalInfo.isOpen}
      style={customModalStyles}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={onRequestClose}
      contentLabel="Select a token"
      ariaHideApp={false}
    >
      <div className={styles.header}>
        <input
          className={styles.input}
          placeholder="Search token name..."
          value={searchedToken}
          onChange={handleSearchChange}
        />
      </div>
      <hr className={styles.line} />
      {listOfTokens.length === 0 ? (
        <div className={styles.spinnerWrapper}>
          <span>No Data</span>
        </div>
      ) : (
        <VirtualList
          data={listOfTokens}
          height={CONTAINER_HEIGHT}
          itemHeight={ITEM_HEIGHT}
          itemKey={(item) => item.currency}
        >
          {(token) => (
            <div
              key={token.currency}
              className={styles.tokenItem}
              onClick={() => handleSelectToken(token)}
            >
              {React.createElement(tokenImages[token.currency])}
              <div className={styles.currencyName}>
                {token.currency.toUpperCase()}
              </div>
            </div>
          )}
        </VirtualList>
      )}
    </ReactModal>
  );
};

export default React.memo(SelectTokenModal, isEqual);
