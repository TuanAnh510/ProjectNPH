import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Category from "@component/category/Category";
import { useRouter } from "next/router";
import Link from "next/link";
const NavbarNew = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/Blog");
  };

  return (
    <>
      <div className="hidden lg:block xl:block bg-[#eeeeeeee] border-b ">
        <div className="flex justify-center text-center ">
          <button className="bg-[#ffcc33]  text-black py-3 px-10 peer">
            <div className=" flex justify-between gap-24 ">
              <p>Danh Mục</p>
              <div className="py-1">
                <AiOutlineMenu />
              </div>
            </div>
          </button>
          <button className="hidden peer-hover:flex hover:flex w-[200px] text-sm flex-col bg-white drop-shadow-lg absolute text-left ">
            {/* <Category /> */}
          </button>
          <Link href="/product">
            <button className="py-3 text-center px-10">Bảng Giá</button>
          </Link>

          <div></div>
          <Link href="/warrantycheck">
            <button className="py-3 text-center px-10">
              Kiểm Tra Bảo Hành
            </button>
          </Link>
          <Link href="/productsale">
            <button className="py-3 text-center px-14">Sale</button>
          </Link>
          {/* <div className="py-3 text-center hover:bg-[#ff3366] px-10">
            Userd 99%
          </div> */}
          <button
            className="py-3 text-center  px-10"
            onClick={handleButtonClick}
          >
            Tin Cần Xem
          </button>
          <div>
            <button className="peer py-3 text-center  px-10 relative before::bg-[#ff3366]">
              Hỗ Trợ
            </button>

            <button className="hidden peer-hover:flex hover:flex w-[200px] text-sm flex-col bg-white drop-shadow-lg absolute text-left z-[15]">
              <ul className="list-none p-0">
                <Link href="/about-us">
                  <li className="px-5 py-3 hover:bg-gray-200 before:inline-block before:mr-2 before:content-['1.']">
                    Giới thiệu
                  </li>
                </Link>

                <li className="px-5 py-3 hover:bg-gray-200 before:inline-block before:mr-2 before:content-['2.']">
                  <a href="#">Điều khoản bảo hành</a>
                </li>
                <li className="px-5 py-3 hover:bg-gray-200 before:inline-block before:mr-2 before:content-['3.']">
                  <a href="#">Thanh toán-Mua hàng-Ship hàng</a>
                </li>
                <li className="px-5 py-3 hover:bg-gray-200 before:inline-block before:mr-2 before:content-['4.']">
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li className="px-5 py-3 hover:bg-gray-200 before:inline-block before:mr-2 before:content-['5.']">
                  <a href="#">Tra cứu bảo hành</a>
                </li>
              </ul>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarNew;
