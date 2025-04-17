import { fetchEtf, fetchEtfList } from "@/services/reptileEtf";
import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { loopRun } from "@/lib";
import { EtfInfo } from "@/type";

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
    // 本地开发环境，写入文件
    fs.writeFileSync(
      path.resolve("./app/assets/etfs.json"),
      JSON.stringify(json, null, 2)
    );
  }
  return NextResponse.json(json);
};
