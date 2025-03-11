"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AnalysisItem: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="flex">
      {props.children}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const Analysis = () => {
  return (
    <div>
      <AnalysisItem>日K：</AnalysisItem>
      <AnalysisItem>周K：</AnalysisItem>
      <AnalysisItem>月K：</AnalysisItem>
    </div>
  );
};

export default Analysis;
