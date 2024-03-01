import ErrorPage from "@/components/error-page";

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function Page ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const code = Number(searchParams.code);
  return (
    <ErrorPage httpStatusCode={Number(code)} />
  )
}