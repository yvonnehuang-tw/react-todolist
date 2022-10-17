import { useState } from "react";

export default function CustomButton(props) {
  const { title, bgColor, hoverBgColor, color, icon, name, handleClick } = props;
  const [isHover, setIsHover] = useState(false);
  const tmpBgColor = bgColor ? bgColor : "rgba(44, 54, 63, 1)";
  const tmpHoverBgColor = hoverBgColor ? hoverBgColor : "rgba(44, 54, 63, 1)";
  const tmpColor = color ? color : "#ffffff";

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const btnStyle = {
    border: "none",
    padding: "10px 15px",
    borderRadius: 5,
    marginLeft: 28,
    cursor: "pointer",
    backgroundColor: isHover ? tmpHoverBgColor : tmpBgColor,
    color: tmpColor,
  };

  return (
    <button
      type="button"
      title={title}
      style={btnStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon ? <i className={icon}></i> : name}
    </button>
  );
}
