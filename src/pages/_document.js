import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta property="og:title" content="NPH - Digital" />
          <meta property="og:type" content="NPH Digital" />
          <meta
            property="og:description"
            content=" Chuyên cung cấp linh kiện điện tử"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
