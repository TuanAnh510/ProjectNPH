import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import Layout from "@layout/Layout";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext } from "react";
import StickyCart from "@component/cart/StickyCart";
import { useEffect } from "react";
import ProductCard from "@component/product/ProductCard";
import ProductServices from "@services/ProductServices";
import AttributeServices from "@services/AttributeServices";
import { useState } from "react";
import PageHeader from "@component/header/PageHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoryCarousel from "@component/carousel/CategoryCarousel";
import dynamic from "next/dynamic";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";

const Product = ({ popularProducts, attributes }) => {
  const { t } = useTranslation();
  const { data: customPage } = useAsync(SettingServices.getCustomPage);

  const [visibleProducts, setVisibleProducts] = useState(
    popularProducts.slice(0, 10)
  );
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (visibleProducts.length >= popularProducts.length) {
      setHasMore(false);
      return;
    }

    const nextBatch = popularProducts.slice(
      visibleProducts.length,
      visibleProducts.length + 10
    );
    setVisibleProducts((prevProducts) => [...prevProducts, ...nextBatch]);
  };

  const router = useRouter();
  const [row, setRow] = useState(30);
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <Layout>
        {/* {isLoading ? (
          <Loading loading={isLoading} />
        ) : ( */}
        <>
          <StickyCart />
          <div className="min-h-screen lg:w-[80%] w-[100%] md:w-[100%] mx-auto">
            {" "}
            {/* <PageHeader
              title={customPage?.titlePages?.titleAllProduct}
              description="Đây là trang tất cả sản phẩm"
            /> */}
            <div className="relative">
              <img
                src={customPage?.backgoundImage}
                className="lg:h-[250px] h-[100px] w-full bg-cover "
              />
              {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> */}
              <p className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-bold font-serif text-center  ">
                {customPage?.titlePages?.titleAllProduct}
              </p>
            </div>
            <div className=" mx-auto">
              <CategoryCarousel />
            </div>
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="flex">
                <div className="w-full">
                  <InfiniteScroll
                    dataLength={visibleProducts.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    // endMessage={<p>No more products</p>}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-3">
                      {visibleProducts?.slice(0, row).map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-center gap-5 pb-10">
              <button
                className="text-center bg-[#16a34a] w-[10%] rounded-md h-[30px] text-white"
                onClick={() => setRow(row + 30)}
              >
                <p>{t("common:loadMoreBtn")}</p>
              </button>
              {row != 30 && (
                <button
                  className="text-center bg-[#16a34a] w-[10%] rounded-md h-[30px] text-white"
                  onClick={() => setRow(row - 30)}
                >
                  <p>{t("common:Collapse")}</p>
                </button>
              )}
            </div> */}
          </div>
        </>
        {/* )} */}
      </Layout>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const products = await ProductServices.getShowingProducts();
  const attributes = await AttributeServices.getShowingAttributes();

  return {
    props: {
      popularProducts: products,
      attributes,
    },
  };
};
export default dynamic(() => Promise.resolve(Product), { ssr: false });
