import Image from "next/image";
import { cn } from "@/lib/utils";

/** Real photography, cropped to fill its container. */
export function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-stone", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
    </div>
  );
}
