"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Footer from "@/components/dashboard/footer";

function User() {
  type User = {
    id: number;
    name: string;
    email: string;
    image: string;
    is_online: boolean;
    role_id: number;
  };
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-users`, {
        next: { revalidate: 60 },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await user.json();

      if (user.ok) {
        setUsers(data);
        console.log(data);
      } else {
        let message = data.message;
        if (typeof message === "object") {
          message = Object.values(data.message).join(", ");
        }
        alert(message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleRole = (role_id: number) => {
    switch (role_id) {
      case 1:
        return "Admin";
      case 2:
        return "User";
      case 3:
        return "Editor";
      default:
        return "User";
    }
  };
  const handleRoleColor = (role_id: number) => {
    switch (role_id) {
      case 1:
        return "Full powers";
      case 2:
        return "Read only";
      case 3:
        return "Edit";
      default:
        return "Read only";
    }
  };
  return (
    <>
      <div className="w-full py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h5 className="text-lg">Users table</h5>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                          Users
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                          Function
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                          Status
                        </th>
                        <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-700 opacity-70"></th>
                      </tr>
                    </thead>
                    {loading ? (
                      <tbody>
                        <tr>
                          <td>
                            <div className="p-8 bg-white text-center text-sm text-slate-500">
                              Loading users...
                            </div>
                          </td>
                          <td>
                            <div className="p-8 bg-white text-center text-sm text-slate-500">
                              Loading users...
                            </div>
                          </td>
                          <td>
                            <div className="p-8 bg-white text-center text-sm text-slate-500">
                              Loading users...
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td
                              className={`p-2 align-middle bg-transparent ${
                                index == users.length - 1
                                  ? "border-b-0"
                                  : "border-b"
                              } whitespace-nowrap shadow-transparent`}
                            >
                              <div className="flex px-2 py-1">
                                <div>
                                  <img
                                    src={user.image}
                                    className="inline-flex rounded-xl object-cover items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9"
                                    alt="user1"
                                  />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h6 className="mb-0 text-sm leading-normal">
                                    {user.name}
                                  </h6>
                                  <p className="mb-0 text-xs leading-tight text-slate-500">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td
                              className={`p-2 align-middle bg-transparent ${
                                index == users.length - 1
                                  ? "border-b-0"
                                  : "border-b"
                              } whitespace-nowrap shadow-transparent`}
                            >
                              <p className="mb-0 text-xs font-semibold leading-tight">
                                {handleRole(user.role_id)}
                              </p>
                              <p className="mb-0 text-xs leading-tight text-slate-500">
                                {handleRoleColor(user.role_id)}
                              </p>
                            </td>
                            <td
                              className={`p-2 text-sm leading-normal text-center align-middle bg-transparent ${
                                index == users.length - 1
                                  ? "border-b-0"
                                  : "border-b"
                              } whitespace-nowrap shadow-transparent`}
                            >
                              <span
                                className={`bg-gradient-to-tl rounded-lg py-1.5 px-2.5 text-xs inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white
                            ${
                              user.is_online
                                ? "from-green-600 to-lime-400"
                                : "from-slate-600 to-slate-300"
                            }`}
                              >
                                {user.is_online ? "Online" : "Offline"}
                              </span>
                            </td>
                            <td
                              className={`p-2 align-middle bg-transparent w-auto max-w-max ${
                                index == users.length - 1
                                  ? "border-b-0"
                                  : "border-b"
                              } whitespace-nowrap shadow-transparent`}
                            >
                              <div className="flex gap-2">
                                <Link
                                  href={`/dashboard/users/edit?id=${user.id}`}
                                  className="text-sm px-3 mx-3 py-1 rounded-md bg-white border border-gray-200 hover:shadow"
                                >
                                  Edit
                                </Link>
                                <Link
                                  href="#"
                                  className="text-sm px-3 py-1 rounded-md bg-white border border-red-100 text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default memo(User);
