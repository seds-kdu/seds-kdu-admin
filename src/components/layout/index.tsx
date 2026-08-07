import type { PropsWithChildren } from "react";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <main className="content">
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};
