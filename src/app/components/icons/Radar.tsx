import Image from "next/image";

export default function Radar() {
  return (
    <Image
      src="/images/radar.svg"
      alt="Skills radar"
      fill
      className="object-contain object-center"
      sizes="(min-width: 768px) 320px, 32vw"
      priority
    />
  );
}
