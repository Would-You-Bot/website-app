import Discord from "@/icons/Discord";

interface DiscordLoginButtonProps {
  className?: string;
}

export default function DiscordLoginButton({
  className,
}: DiscordLoginButtonProps) {
  return (
    <>
      <a
        href="/login"
        className={`text-white flex min-w-fit justify-center items-center gap-2 py-2 px-4 leading-loose bg-indigo-500 hover:bg-indigo-500/90 transition ${className}`}
      >
        Login with Discord
        <Discord className="w-6 h-6" />
      </a>
    </>
  );
}
