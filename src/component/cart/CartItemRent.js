import { useContext, useState } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

//internal import
import useAddToCart from "@hooks/useAddToCart";
import { SidebarContext } from "@context/SidebarContext";
import useTranslation from "next-translate/useTranslation";
import useAddRentToCart from "@hooks/useAddRentToCart";

const CartItemRent = ({ item, currency }) => {
    const { updateItemQuantity, removeFromCartLocalStorage } = useAddRentToCart();
    const [quantity, setQuantity] = useState(item.quantity)

    const { closeCartDrawer } = useContext(SidebarContext);
    const { handleIncreaseQuantity } = useAddToCart();
    const { t } = useTranslation();


    const handleUpdateMinus = () => {
        if (quantity == 1)
            return
        const res = updateItemQuantity(item, quantity - 1)
        if (res == true)
            setQuantity(quantity - 1)
    }

    const handleUpdatePlus = () => {
        const res = updateItemQuantity(item, quantity + 1)
        if (res == true)
            setQuantity(quantity + 1)

    }

    return (
        <div className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0">
            <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
                <img
                    key={item.id}
                    src={item?.image[0]}
                    width={40}
                    height={40}
                    alt={item.title.vi}
                />
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                <Link href={`/product/${item.slug}`}>
                    <a
                        onClick={closeCartDrawer}
                        className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1"
                    >
                        {item.title.vi}
                    </a>
                </Link>
                <span className="text-xs text-gray-400 mb-1">
                    {"Phí thuê hằng tháng"} {" "}
                </span>
                <div className="font-bold text-sm md:text-base text-heading leading-5 pb-2">
                    <span>
                        {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.rent?.monthlyrent))}{" x "}{item.quantity}{" = "}    {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.rent?.monthlyrent * item.quantity))}
                    </span>
                </div>
                <span className="text-sm text-gray-600 mb-1 flex">
                    {"Tổng chi phí thuê "}<p className="text-sm font-semibold px-2">{item?.dateRent?.monthRent}</p> {" tháng"}
                </span>
                <div className="font-bold text-sm md:text-base text-heading leading-5">
                    <span>
                        {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.rent?.monthlyrent * item.quantity))}{" x "}{item?.dateRent?.monthRent}{" = "}    {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.rent?.monthlyrent * item.quantity * item?.dateRent?.monthRent))}
                    </span>
                </div>
                <span className="text-xs text-gray-400 mb-1">
                    {"Phí cọc"} {" "}
                </span>
                <div className="font-bold text-sm md:text-base text-heading leading-5 pb-2">
                    <span>
                        {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.rent?.depositcost))}{" x "}{item.quantity}{" = "}    {Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.rent?.depositcost * item.quantity))}
                    </span>
                </div>

                <div className="flex items-center justify-between">

                    <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
                        <button
                            onClick={() => handleUpdateMinus()}
                        >
                            <span className="text-dark text-base">
                                <FiMinus />
                            </span>
                        </button>
                        <p className="text-sm font-semibold text-dark px-1">
                            {quantity}
                        </p>
                        <button onClick={() => handleUpdatePlus()}>
                            <span className="text-dark text-base">
                                <FiPlus />
                            </span>
                        </button>
                    </div>
                    <button
                        onClick={() => removeFromCartLocalStorage(item._id)}
                        className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItemRent;
