import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { authApi, roleOptions } from "@/api/auth";
import type { AccountResponseDto, Role } from "@/types/auth";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<AccountResponseDto[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [updatingRoleUserId, setUpdatingRoleUserId] = useState<number | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Record<number, Role>>({});

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadUsers = async () => {
      setUsersLoading(true);
      setUsersError(null);
      try {
        const allUsers = await authApi.getUsers();
        setUsers(allUsers);
        setSelectedRoles(
          allUsers.reduce<Record<number, Role>>((acc, currentUser) => {
            acc[currentUser.id] = currentUser.role;
            return acc;
          }, {}),
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch users";
        setUsersError(message);
      } finally {
        setUsersLoading(false);
      }
    };

    void loadUsers();
  }, [token]);

  const handleRoleUpdate = async (targetUserId: number) => {
    if (!token) {
      setUsersError("Missing auth token. Please login again.");
      return;
    }

    const role = selectedRoles[targetUserId];
    if (!role) {
      return;
    }

    try {
      setUpdatingRoleUserId(targetUserId);
      setUsersError(null);
      await authApi.updateUserRole(targetUserId, { role });
      setUsers((currentUsers) =>
        currentUsers.map((existingUser) =>
          existingUser.id === targetUserId ? { ...existingUser, role } : existingUser,
        ),
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update user role";
      setUsersError(message);
    } finally {
      setUpdatingRoleUserId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-semibold">Admin User Management</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-red-500/40 text-red-300 hover:bg-red-500/10"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 p-6 space-y-4">
          {usersError && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {usersError}
            </div>
          )}

          {usersLoading ? (
            <div className="text-white/50 text-sm">Loading users...</div>
          ) : (
            <div className="space-y-3">
              {users.map((listedUser) => (
                <div
                  key={listedUser.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border border-white/10 rounded-xl p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{listedUser.username}</p>
                    <p className="text-xs text-white/50">{listedUser.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="h-9 rounded-md bg-black/40 border border-white/20 px-2 text-sm"
                      value={selectedRoles[listedUser.id] ?? listedUser.role}
                      onChange={(event) =>
                        setSelectedRoles((current) => ({
                          ...current,
                          [listedUser.id]: event.target.value as Role,
                        }))
                      }
                    >
                      {roleOptions.map((optionRole) => (
                        <option key={optionRole} value={optionRole}>
                          {optionRole}
                        </option>
                      ))}
                    </select>
                    <Button
                      className="h-9 bg-emerald-500 hover:bg-emerald-600 text-black"
                      disabled={updatingRoleUserId === listedUser.id}
                      onClick={() => void handleRoleUpdate(listedUser.id)}
                    >
                      {updatingRoleUserId === listedUser.id ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
