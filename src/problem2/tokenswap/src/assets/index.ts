import { ReactComponent as BLUR } from "./tokens/BLUR.svg";
import { ReactComponent as bNEO } from "./tokens/bNEO.svg";
import { ReactComponent as BUSD } from "./tokens/BUSD.svg";
import { ReactComponent as USD } from "./tokens/USD.svg";
import { ReactComponent as ETH } from "./tokens/ETH.svg";
import { ReactComponent as GMX } from "./tokens/GMX.svg";
import { ReactComponent as STEVMOS } from "./tokens/stEVMOS.svg";
import { ReactComponent as LUNA } from "./tokens/LUNA.svg";
import { ReactComponent as RATOM } from "./tokens/rATOM.svg";
import { ReactComponent as STRD } from "./tokens/STRD.svg";
import { ReactComponent as EVMOS } from "./tokens/EVMOS.svg";
import { ReactComponent as IBCX } from "./tokens/IBCX.svg";
import { ReactComponent as IRIS } from "./tokens/IRIS.svg";
import { ReactComponent as ampLUNA } from "./tokens/ampLUNA.svg";
import { ReactComponent as KUJI } from "./tokens/KUJI.svg";
import { ReactComponent as STOSMO } from "./tokens/stOSMO.svg";
import { ReactComponent as USDC } from "./tokens/USDC.svg";
import { ReactComponent as axlUSDC } from "./tokens/axlUSDC.svg";
import { ReactComponent as ATOM } from "./tokens/ATOM.svg";
import { ReactComponent as STATOM } from "./tokens/stATOM.svg";
import { ReactComponent as OSMO } from "./tokens/OSMO.svg";
import { ReactComponent as rSWTH } from "./tokens/rSWTH.svg";
import { ReactComponent as STLUNA } from "./tokens/stLUNA.svg";
import { ReactComponent as LSI } from "./tokens/LSI.svg";
import { ReactComponent as OKB } from "./tokens/OKB.svg";
import { ReactComponent as OKT } from "./tokens/OKT.svg";
import { ReactComponent as SWTH } from "./tokens/SWTH.svg";
import { ReactComponent as USC } from "./tokens/USC.svg";
import { ReactComponent as WBTC } from "./tokens/WBTC.svg";
import { ReactComponent as wstETH } from "./tokens/wstETH.svg";
import { ReactComponent as YieldUSD } from "./tokens/YieldUSD.svg";
import { ReactComponent as ZIL } from "./tokens/ZIL.svg";

const tokenImages: Record<
  string,
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >
> = {
  BLUR,
  bNEO,
  BUSD,
  USD,
  ETH,
  GMX,
  STEVMOS,
  LUNA,
  RATOM,
  STRD,
  EVMOS,
  IBCX,
  IRIS,
  ampLUNA,
  KUJI,
  STOSMO,
  USDC,
  axlUSDC,
  ATOM,
  STATOM,
  OSMO,
  rSWTH,
  STLUNA,
  LSI,
  OKB,
  OKT,
  SWTH,
  USC,
  WBTC,
  wstETH,
  YieldUSD,
  ZIL,
};

export default tokenImages;
