import unidecode from "unidecode-plus";

export const convertToSlug = (text: string): string => {
  const unidecodeText = unidecode(text.trim());

  const slug: string = unidecodeText.replace(/\s+/g, "-");
  console.log("slug", slug);
  console.log("unidecodeText", unidecodeText);
  return slug;
};
