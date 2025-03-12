import { getKlineData } from "@/app/services/klineData";
import { fetchEtf } from "@/app/services/reptileEtf";
import { NextResponse } from "next/server";

export const GET = async () => {
  // const result = await fetchEtf("161725");
  const result = await getKlineData();
  return NextResponse.json(result);
};
