
/* resources is an array of {src, offset, speed, className, alt} when used inside Parallax */
export function ResourceImage(
  { src, alt, imgClass = "w-44 sm:w-72 lg:w-96", wrapperClass = "" }: { src: string; alt?: string; imgClass?: string; wrapperClass?: string }
) {
  return (
    <div className={`flex items-center ${wrapperClass}`}>
      <img src={src} alt={alt} className={imgClass} />
    </div>
  );
}
