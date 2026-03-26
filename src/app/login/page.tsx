import { AuthExperience } from "@/components/auth-experience";

type LoginPageProps = {
  searchParams?: Promise<{
    reset?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const resetValue = params?.reset;
  const showResetSuccess = Array.isArray(resetValue)
    ? resetValue.includes("1")
    : resetValue === "1";

  return <AuthExperience initialTab="login" showResetSuccess={showResetSuccess} />;
}
