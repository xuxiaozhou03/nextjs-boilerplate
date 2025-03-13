import { columns, Payment } from "./grid/columns";
import { DataTable } from "@/components/data-table";

const Page = () => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  return (
    <div>
      <h1>Grid Trading</h1>
      <div>
        <div>初始资金: 1000</div>
        <div>下跌网格: 100</div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
