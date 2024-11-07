import { Link } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

export default function BoughtRoute() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold">BOUGHT</h1>
        <p className="uppercase text-neutral-600">
          A history of items buyed in the ceur_shop. Want to buy something?{" "}
          <Link to={ROUTE.HOME} className="underline">
            Check what&apos;s for you.
          </Link>
        </p>
      </div>
    </div>
  );
}
