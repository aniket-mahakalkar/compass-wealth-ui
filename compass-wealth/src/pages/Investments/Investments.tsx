import { useEffect, useState } from "react";
import { InvestService } from "@/api/investment";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Pencil, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import ManageInvestment, { type Investment } from "./ManageInvestment";

const Investments = () => {
  const [assets, setAssets] = useState<Investment[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Investment | null>(null);
  const [model, setModel] = useState<{ open: boolean; type?: "add" | "edit" }>({
    open: false,
    type: "add",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await InvestService.getAllInvestments();
      setAssets(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data: Investment) => {
    try {
      if (model.type === "add") {
        await InvestService.addInvestment(data);
      } else {
        await InvestService.updateInvestment(data);
      }
      fetchAssets();
    } catch (err) {
      console.error(err);
    } finally {
      setModel({ open: false });
      setSelectedAsset(null);
    }
  };

  const columns: any[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    { title: "Units", dataIndex: "no_of_units", key: "no_of_units" },
    {
      title: "Buy Price",
      dataIndex: "avg_buy_price",
      key: "avg_buy_price",
      align: "center",
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
      align: "center",

    },
    {
      title: "Charges",
      dataIndex: "charges",
      key: "charges",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      render: (_: any, record: Investment) => (
        <Button
          variant="default"
          size="sm"
          className="bg-blue-50"
          onClick={() => {
            setModel({ open: true, type: "edit" });
            setSelectedAsset(record);
          }}
        >
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
      ),
    },
  ];
  return (
    <div className=" w-full bg-[#0a0a0a] text-white p-6">
      <Table
        columns={columns}
        dataSource={assets}
        pagination={false}
        title={() => (
          <div className="flex justify-between">
            <div className="flex gap-2 text-xl font-semibold items-center">
              <PiggyBank className="w-5 h-5 text-emerald-400" />
              Asset List
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="default"
                className="bg-blue-50"
                onClick={() => setModel({ open: true, type: "add" })}
              >
                <p>
                  <PlusOutlined /> Add
                </p>
              </Button>
            </div>
          </div>
        )}
      ></Table>

      <ManageInvestment
        open={model.open}
        onClose={() => setModel({ open: false })}
        onSubmit={handleSubmit}
        defaultValues={selectedAsset}
        mode={model.type}
      />
    </div>
  );
};

export default Investments;
