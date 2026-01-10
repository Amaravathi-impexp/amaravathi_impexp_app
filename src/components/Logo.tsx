import logo from 'figma:asset/bea3c192c26a7b41f3b641feddfa98e2ba96e0f5.png';

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img src={logo} alt="Amaravathi Imports & Exports" className={className} />
  );
}