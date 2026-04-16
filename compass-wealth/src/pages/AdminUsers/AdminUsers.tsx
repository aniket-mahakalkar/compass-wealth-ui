import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { AccountResponseDto } from "@/types/auth";
import { AdminApi } from "@/api/admin";
import { message, Table, Tag } from "antd";

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<AccountResponseDto[]>([]);
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadUsers = async () => {
      setLoading("users");

      try {
        const allUsers = await AdminApi.getUsers();
        setUsers(allUsers);
        console.log(allUsers);
      } catch (err) {
        message.error("Failed to load users. Please try again.");
      } finally {
        setLoading("");
      }
    };

    void loadUsers();
  }, [token]);


  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center" as const,
      render: (role: string) => {
        return (
          <div>
            <Tag color={role === "ADMIN" ? "blue" : "green"} key={role}>
              {role}
            </Tag>
          </div>
        );
      },
    },
  ];

  return (
    <div className=" w-full bg-[#0a0a0a] text-white p-6">
      <div>
        <Table
          bordered
          loading={loading === "users"}
          dataSource={users}
          columns={columns}
          pagination={false}
          title={() => (
            <div className="flex justify-between bg-red">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h1 className="text-xl font-semibold">
                  Admin User Management
                </h1>
              </div>
            </div>
          )}
        ></Table>
      </div>
    </div>
  );
};

export default AdminUsers;
