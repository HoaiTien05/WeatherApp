import UnitToggle from "./UnitToggle";
import Logo from "../assets/images/logo.svg";

// props: units, setUnits
export default function Header({ units, setUnits }) {
  return (
    <header className="flex justify-between items-center py-6">
      <div className="flex items-center gap-3">
        <img
          src={Logo} 
          alt="Weather Now Logo"
          className="w-50 h-20 object-contain"
        />
      </div>

      {/* Unit toggle */}
      <UnitToggle units={units} setUnits={setUnits} />
    </header>
  );
}
