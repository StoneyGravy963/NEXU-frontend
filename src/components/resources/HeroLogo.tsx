
export default function HeroLogo({ small = false }) {
  return (
    <div className={`flex items-center justify-center ${small ? "mt-8" : "mt-14"}`}>
      <img src="/img/nexuLetter.webp" alt="NEXU Logo" width={small ? 110 : 150} height={small ? 110 : 150} />
    </div>
  );
}
