import { useEffect } from "react";
import { InvestService } from "@/api/investment";
import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const Investments = () => {
  useEffect(() => {
    const getInvestments = async () => {
      try {
        const res = await InvestService.getAllInvestments();
        console.log(res);
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };

    getInvestments();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Investments</h1>

      <Table title={() => <div className="flex justify-between">Asset List

        <div className="flex gap-2">

          <Button icon={<PlusOutlined />} type="primary" size="small">Add</Button>
          <Button icon={<EditOutlined />} type="primary" size="small">Edit</Button>
            
          

        </div>
      </div>}></Table>
    </div>
  );
};

export default Investments;
