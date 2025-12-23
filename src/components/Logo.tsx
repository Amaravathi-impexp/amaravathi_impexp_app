import logo from 'figma:asset/0c91db81c820114cba2fa424e34753a60f869e2e.png';

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img src={logo} alt="Amaravathi Imports & Exports" className={className} />
  );
}