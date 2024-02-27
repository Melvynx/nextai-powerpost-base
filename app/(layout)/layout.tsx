import { Footer } from "@/components/features/layout/Footer";
import { Header } from "@/components/features/layout/Header";
import { PropsWithChildren } from "react";

export default function NextLayout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
