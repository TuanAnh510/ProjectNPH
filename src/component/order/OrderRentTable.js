import React from "react";
import dayjs from "dayjs";

const OrderRentTable = ({ data, currency }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-100 text-serif text-sm">
      {data?.cart?.map((item, i) => (
        <tr key={i}>
          <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
            {i + 1}{" "}
          </th>
          <td className="px-6 py-1 w-80 whitespace-normal font-normal text-gray-500">
            {item?.title?.vi.slice(0, 30)}...
          </td>

          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item?.dateRent?.startDate}
          </td>

          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item?.dateRent?.endDate}
          </td>

          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: currency,
            }).format(Number(item?.rent?.monthlyrent))}
          </td>

          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item?.quantity}{" "}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item?.dateRent?.monthRent}
          </td>

          <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: currency,
            }).format(
              Number(
                item?.rent?.monthlyrent *
                  item?.quantity *
                  item?.dateRent?.monthRent
              )
            )}
          </td>

          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: currency,
            }).format(Number(item?.rent?.depositcost * item?.quantity))}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderRentTable;
