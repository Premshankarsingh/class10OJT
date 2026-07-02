"use client";
const Logo = (props) => {
  return (
    <img
      className="logoimageBox"
      src="/images/logo.png"
      alt="Logo"
      {...props}
      style={{  height: "70px" , width: "auto", cursor: "pointer" }}
    />
  );
};

export default Logo;
