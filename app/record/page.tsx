import React from "react";
import { groupIndexEtfs } from "../utils/data";
import Analysis from "./components/analysis";
import Suggestions from "./components/suggestions";
import HoldLog from "./components/holdLog";
import Result from "./components/result";

const Record = () => {
  return (
    <table className="w-full border-gray-300">
      <thead>
        <tr className="border-b">
          <th>跟踪指数</th>
          <th className="border-l">ETF</th>
          <th className="border-l">规模（亿）</th>
          <th className="border-l">分析</th>
          <th className="border-l">建议</th>
          <th className="border-l">持仓日志</th>
          <th className="border-l">结果</th>
        </tr>
      </thead>
      <tbody>
        {groupIndexEtfs.map((group) => {
          const firstEtf = group.etfs[0];
          return (
            <React.Fragment key={group.index}>
              <tr className="border-b">
                <td rowSpan={group.etfs.length}>{group.index}</td>
                <td className="border-l">
                  {firstEtf.name}({firstEtf.symbol})
                </td>
                <td className="border-l">{firstEtf.scale}</td>
                <td className="border-l">
                  <Analysis />
                </td>
                <td className="border-l">
                  <Suggestions />
                </td>
                <td className="border-l">
                  <HoldLog />
                </td>
                <td className="border-l">
                  <Result />
                </td>
              </tr>
              {group.etfs.slice(1).map((etf) => (
                <tr key={etf.symbol} className="border-b">
                  <td className="border-l">
                    {firstEtf.name}({firstEtf.symbol})
                  </td>
                  <td className="border-l">{etf.scale}</td>
                  <td className="border-l">
                    <Analysis />
                  </td>
                  <td className="border-l">
                    <Suggestions />
                  </td>
                  <td className="border-l">
                    <HoldLog />
                  </td>
                  <td className="border-l">
                    <Result />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Record;
