import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const asideState = atom({
  key: "asideState",
  default: false,
});
