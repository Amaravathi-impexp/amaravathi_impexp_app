import logo from 'figma:asset/578fe4154402c7ef886602add35bb69f13e358e0.png';

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img src={logo} alt="TIMPEX.club - Telugu Import Export Club" className={className} />
  );
}
