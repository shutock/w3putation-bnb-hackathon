"use client";

import classNames from "classnames";

import "./global.scss";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <style jsx>{`
        body {
          color: white;
          background-color: black;
          font-family: sans-serif;
        }
      `}</style>
      <body className={classNames("dark")}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
