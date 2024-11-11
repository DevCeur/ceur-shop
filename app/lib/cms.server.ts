import * as Contentful from "contentful";

const CONTENTFUL_SPACE = process.env.CONTENTFUL_SPACE;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!CONTENTFUL_SPACE) throw new Error("Missing CONTENTFUL_SPACE env variable");
if (!CONTENTFUL_ACCESS_TOKEN)
  throw new Error("Missing CONTENTFUL_ACCESS_TOKEN env variable");

export const cms = Contentful.createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});
