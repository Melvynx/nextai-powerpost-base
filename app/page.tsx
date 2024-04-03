import { Header } from "@/components/features/layout/Header";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Video } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="bg-background">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-muted-foreground bg-card rounded-full "
            role="alert"
          >
            <span className="text-xs bg-primary-600 rounded-full text-white bg-primary px-4 py-1.5 mr-3">
              New
            </span>{" "}
            <span className="text-sm font-medium">
              PowerPost credits is out
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-foreground md:text-5xl lg:text-6xl ">
            Stop wasting time reading too long post.
          </h1>
          <p className="mb-8 text-lg font-normal text-muted-foreground lg:text-xl sm:px-16 xl:px-48 ">
            We help you to generate a summary of any post, article or document
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Learn more
              <ArrowRight />
            </a>
            <a href="#" className={buttonVariants({ size: "lg" })}>
              <Video />
              Watch video
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
