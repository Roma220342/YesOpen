import { Screen } from "@/components/screen-frame";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await params;
  return <Screen group="onboarding" id={id} searchParams={searchParams} />;
}
