export default function Logo({ className = "text-4xl" }: { className?: string }) {
  return (
    <div className={`font-bold text-primary ${className}`}>
      Veyya
    </div>
  );
}
