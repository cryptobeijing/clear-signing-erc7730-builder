"use client";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export interface Props {
  id: string;
}
const GoogleTagManager = ({ id }: Props) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: id });
  }, [id]);
  return null;
};
export default GoogleTagManager;
