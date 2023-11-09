import Image from 'next/image';
import { useRouter } from 'next/router';
import { showingTranslateValue } from "@utils/translate";
import useTranslation from "next-translate/useTranslation";

const BrandCard = ({ products }) => {
  const router = useRouter();
  const { lang } = useTranslation("ns1"); // default namespace (optional)

  return (
    <>
      <div
        onClick={() =>
          router.push(
            `/search?Brand=${products.name}`
          )
        }
        className="group box-border overflow-hidden flex rounded-full shadow-lg pe-0 flex-col items-center bg-white relative">
        <div
          className="relative flex justify-center w-full cursor-pointer"
        >
          <Image
            src={products.image[0]}
            width={160}
            height={160}
            alt={products.title}
            className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
          />
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <h2 className="text-heading text-center truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">
                {showingTranslateValue(products?.title, lang)}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCard;
