import { json } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return json({ products: [] });
};

export default function WhatsThisRoute() {
  return (
    <div>
      <h1 className="text-6xl font-semibold uppercase">Shop All</h1>
    </div>
  );
}
