import { Link } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

export default function HowToBuyRoute() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold">1. CHECK_WHATS_FOR_YOU</h1>
        <p className="uppercase">
          Check your{" "}
          <Link to={ROUTE.HOME} className="underline">
            homepage
          </Link>
          , every day you&apos;ll see four different items to buy.
        </p>
      </div>
    </div>
  );
}
