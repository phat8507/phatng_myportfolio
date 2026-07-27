import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

function Pagination({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("flex", className)} {...props} />;
}

type PaginationLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
};

function PaginationLink({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-[0.82rem] font-bold transition-all",
        isActive
          ? "border-[#0F2A4A] bg-[#0F2A4A] text-white shadow-[0_8px_18px_rgba(15,42,74,0.14)]"
          : "border-[#D8E1EC] bg-white/80 text-[#0F2A4A] hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_6px_14px_rgba(15,42,74,0.06)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function PaginationPrevious({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1.5 px-3.5", className)}
      {...props}
    >
      <CaretLeft size={15} />
      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1.5 px-3.5", className)}
      {...props}
    >
      <span>Next</span>
      <CaretRight size={15} />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-9 min-w-9 items-center justify-center text-[#5B6B82]", className)}
      {...props}
    >
      <DotsThree size={16} />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
