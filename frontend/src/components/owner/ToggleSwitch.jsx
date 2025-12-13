import React from "react";

function ToggleSwitch({
  checked = false,
  onChange = () => {},
  size = "md",
  onColor = "bg-blue-600",
  offColor = "bg-slate-300",
  showLabel = false,
}) {
  const sizeMap = {
    sm: {
      track: "w-10 h-6",
      dot: "w-4 h-4",
      translate: "translate-x-4",
    },
    md: {
      track: "w-12 h-7",
      dot: "w-5 h-5",
      translate: "translate-x-5",
    },
    lg: {
      track: "w-14 h-8",
      dot: "w-6 h-6",
      translate: "translate-x-6",
    },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className="inline-flex items-center gap-3">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />

        {/* track */}
        <div
          className={`
            relative rounded-full transition-colors duration-200 ease-in-out
            ${s.track}
            ${checked ? onColor : offColor}
          `}
        >
          {/* dot */}
          <span
            className={`
              absolute left-1 top-1 bg-white rounded-full shadow-sm
              transition-transform duration-200 ease-in-out
              ${s.dot}
              ${checked ? s.translate : ""}
            `}
          />
        </div>
      </label>

      {showLabel && (
        <span className="text-sm text-gray-700 select-none">
          {checked ? "On" : "Off"}
        </span>
      )}
    </div>
  );
}

export default ToggleSwitch;
