import { ReactNode } from "react";

export type modalPropsTypes = {
  isVisible: boolean;
  childComponent: ReactNode;
  toggleIsVisibleCb: Function;
};
