import { request } from "@/app/utils/request";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const fetchEtf = async (symbol: string) => {
  const data = await request(
    `https://fundf10.eastmoney.com/jbgk_${symbol}.html`
  );
  const $ = cheerio.load(data);
  const result = {
    // 规模
    scale: parseFloat($(".info.w790 tr:eq(3) td:eq(0)").text()),
    // 跟踪标的
    trackingIndex: $(".info.w790 tr:eq(9) td:eq(1)").text(),
    // 业绩比较基准
    performanceBenchmark: $(".info.w790 tr:eq(9) td:eq(0)").text(),
  };
  return result;
};

export const GET = async () => {
  const result = await fetchEtf("161725");
  return NextResponse.json(result);
};
