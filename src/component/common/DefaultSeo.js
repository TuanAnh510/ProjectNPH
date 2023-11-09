import React from 'react';
import { DefaultSeo as NextSeo } from 'next-seo';

const DefaultSeo = () => {
  const keywords = [
    "linh kiện máy tính",
    "mạch in",
    "bộ vi xử lý",
    "ổ cứng SSD",
    "card đồ họa",
    "ram máy tính",
    "nguồn máy tính",
    "màn hình máy tính",
    "chuột và bàn phím",
    "tản nhiệt CPU",
    "ổ cứng HDD",
    "linh kiện máy tính gaming",
    "linh kiện máy tính chất lượng cao",
    "cửa hàng linh kiện máy tính",
    "linh kiện máy tính giá rẻ",
    "linh kiện máy tính online",
    "phụ kiện máy tính",
    "linh kiện máy tính phong phú",
    "tản nhiệt nước",
    "linh kiện máy tính chơi game",
    "thiết bị ngoại vi máy tính",
    "ổ cứng di động",
    "linh kiện máy tính Việt Nam",
    "linh kiện máy tính trực tuyến",
    "tai nghe",
    "cáp sạc",
    "máy live stream"
  ];
  return (

    <NextSeo
      title="NPH DIGITAL - Cửa hàng bán linh kiện máy tính Việt Nam"
      description="NPH DIGITAL là cửa hàng chuyên cung cấp linh kiện máy tính chất lượng cao tại Việt Nam. Đến với chúng tôi để tìm mua các sản phẩm linh kiện máy tính phong phú và đa dạng."
      openGraph={{
        type: 'website',
        locale: 'vi_VN',
        url: 'https://www.nphdigital.vn',
        images: [
          {
            url: '/logo/logoweb.png',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/png',
          },
          {
            url: '/logo/logoweb.png',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
            type: 'image/png',
          },
          { url: '/logo/logoweb.png' },
          { url: '/logo/logoweb.png' },
        ],
        site_name: 'NPH DIGITAL- Cửa hàng bán linh kiện máy tính Việt Nam',

      }}
      robotsProps={{
        nosnippet: true,
        notranslate: true,
        noimageindex: true,
        noarchive: true,
        maxSnippet: -1,
        maxImagePreview: 'none',
        maxVideoPreview: -1,
      }}
      keywords={keywords}
      twitter={{
        handle: '@your_twitter_handle',
        site: '@your_twitter_site',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content:
            'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: '/logo/logoweb.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },

      ]}

    />

  );
};

export default DefaultSeo;
