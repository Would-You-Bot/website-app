import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/user-dropdown-menu";
import { IdTokenJWT } from "@/helpers/oauth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  idToken: IdTokenJWT | null;
  items: { label: string; href: string; icon: any }[];
}

export default function UserDropdown({ idToken, items }: UserDropdownProps) {
  const user = idToken?.payload;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex px-4 py-2 items-center hover:bg-white/5 gap-2 rounded-lg transition">
        <Avatar>
          <AvatarImage
            src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.jpg`}
          />
          <AvatarFallback>
            <Image
              src="https://cdn.discordapp.com/embed/avatars/1.png"
              alt="avatar example"
              width={90}
              height={90}
            />
          </AvatarFallback>
        </Avatar>
        <span className="text-white text-lg">{user?.username}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent> 
        {items.map((item, i) => (
          <Link key={i} href={item.href}>
            <DropdownMenuItem className="flex gap-2">
              <item.icon className="h-4 w-4 mt-0.5" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <a href="/logout" className="w-full text-[#F00505]">
          <DropdownMenuItem className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4 mt-0.5" />
            Logout
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
