import UnitToggle from "./UnitToggle";
import Logo from "../assets/images/logo.svg";

// props: units, setUnits
export default function Header({ units, setUnits }) {
  return (
    <header className="flex justify-between items-center py-6">
      {/* Logo + Text */}
      <div className="flex items-center gap-3">
        {/* Thay div vàng bằng <img> */}
        <img
          src={Logo} // đường dẫn từ thư mục public/images/
          alt="Weather Now Logo"
          className="w-50 h-20 object-contain"
        />
        {/* <span className="font-semibold text-lg">Weather Now</span> */}
      </div>

      {/* Unit toggle */}
      <UnitToggle units={units} setUnits={setUnits} />
    </header>
  );
}
