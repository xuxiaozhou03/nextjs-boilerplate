export const request = async (
  url: string,
  options: RequestInit & {
    params?: Record<string, string>;
    type?: "text" | "json";
  } = {}
) => {
  const { params = {}, type = "text", ...restOptions } = options;
  const searchParams = new URLSearchParams(params);
  const fetchUrl = `${url}?${searchParams.toString()}`;
  const res = await fetch(fetchUrl, restOptions);
  if (type === "text") {
    return res.text();
  }
  return await res.json();
};
