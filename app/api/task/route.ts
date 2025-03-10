import { fetchEtf, fetchEtfList } from "@/app/services/reptileEtf";
import { NextResponse } from "next/server";
import * as fs from "fs";
import { loopRun } from "@/app/utils";
import { EtfInfo } from "@/app/type";

export const GET = async () => {
  const etfs = await fetchEtfList();

  const result: EtfInfo[] = [];

  const fns = etfs.map((etf) => async () => {
    console.log("start", etf.symbol);
    const data = await fetchEtf(etf.symbol);
    console.log("end", etf.symbol);
    result.push({
      ...data,
      ...etf,
    });
  });

  await loopRun(fns, 100);

  const fields = [
    "symbol",
    "name",
    "scale",
    "trackingIndex",
    "performanceBenchmark",
  ];

  const json = {
    fields,
    data: result.map((item) => fields.map((field) => item[field as "name"])),
  };
  if (process.env.NODE_ENV === "development") {
    fs.writeFileSync("etfs.json", JSON.stringify(json));
  }
  return NextResponse.json(json);
};
