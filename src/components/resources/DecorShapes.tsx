
/* Simple decorative shapes that are responsive */
export default function DecorShapes() {
  return (
    <>
      <div className="pointer-events-none absolute left-4 top-12 transform -rotate-6 w-[2.2rem] sm:w-[3.2rem] md:w-[4.8rem] h-[40vh] sm:h-[60vh] bg-blue-500/40 rounded-md -z-10" />
      <div className="pointer-events-none absolute right-8 -top-6 transform rotate-4 w-8 sm:w-12 h-[35vh] sm:h-[50vh] bg-blue-400/30 rounded-md -z-10" />
    </>
  );
}
