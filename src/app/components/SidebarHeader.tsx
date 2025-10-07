import Image from "next/image";

type Props = {
  name?: string;
  subtitle?: string;
  avatarSrc?: string;
};

export default function SidebarHeader({
  name = "Gian Paul Ramirez",
  subtitle = "THE DEVELOPER OF SOFTWARE",
  avatarSrc = "/images/header.png",
}: Props) {
  return (
    <div className="flex items-start gap-2">
      {/* Avatar */}
      <div className="shrink-0 p-1">
        <Image
          src={avatarSrc}
          alt="Avatar"
          width={64}
          height={64}
          className="block"
          priority
        />
      </div>

      {/* Name and subtitle */}
      <div className="min-w-0 flex-1">
        <h1 className="whitespace-nowrap leading-none 
                       font-serif font-bold 
                       text-cream text-[clamp(1.75rem,2.5vw+1rem,2.44rem)]">
          {name}
        </h1>

        <div className="leading-none mt-1
                        font-serif  
                        text-golden text-[clamp(1rem,1vw+0.5rem,1.38rem)]">
          {subtitle}
        </div>

        <div className="mt-2 
                        border-t border-golden/30" />
      </div>
    </div>
  );
}
