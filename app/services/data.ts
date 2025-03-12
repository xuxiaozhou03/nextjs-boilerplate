import originEtfs from "../assets/etfs.json";
import { EtfInfo } from "../type";

export const etfs = originEtfs.data.map((etf) => {
  return originEtfs.fields.reduce((acc, field, index) => {
    acc[field as "symbol"] = etf[index] as string;
    return acc;
  }, {} as EtfInfo);
});

const originGroupIndexEtfs = etfs.reduce((acc, etf) => {
  if (!acc[etf.trackingIndex]) {
    acc[etf.trackingIndex] = [];
  }
  acc[etf.trackingIndex].push(etf);
  return acc;
}, {} as { [index: string]: EtfInfo[] });

export const groupIndexEtfs = Object.entries(originGroupIndexEtfs).map(
  ([index, etfs]) => {
    return {
      index,
      etfs: etfs.sort((a, b) => b.scale - a.scale),
    };
  }
);
