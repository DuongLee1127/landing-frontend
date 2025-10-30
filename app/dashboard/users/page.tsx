"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User() {
  type User = {
    id: number;
    name: string;
    email: string;
    image: string;
  };
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const user = await fetch("http://localhost:8000/api/get-users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await user.json();

      if (user.ok) {
        setUsers(data);
      } else {
        let message = data.message;
        if (typeof message === "object") {
          message = Object.values(data.message).join(", ");
        }
        alert(message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>Users table</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Users
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Function
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Status
                        </th>
                        <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={user.image}
                                  className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 text-sm leading-normal">
                                  {user.name}
                                </h6>
                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-xs font-semibold leading-tight">
                              Programator
                            </p>
                            <p className="mb-0 text-xs leading-tight text-slate-400">
                              Deverloper
                            </p>
                          </td>
                          <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                              Offline
                            </span>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <Link
                              href={`/dashboard/users/edit?id=${user.id}`}
                              className="text-xs font-semibold leading-tight text-slate-400"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="pt-4">
          <div className="w-full px-6 mx-auto">
            <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
              <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                  © 2025, made with <i className="fa fa-heart"></i> by
                  <a
                    href="https://www.creative-tim.com"
                    className="font-semibold text-slate-700"
                    target="_blank"
                  >
                    DuongLe
                  </a>
                  for a better web.
                  <span className="w-full"> Distributed by ❤️ ThemeWagon </span>
                </div>
              </div>
              <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                    >
                      DuongLe
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                      target="_blank"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
