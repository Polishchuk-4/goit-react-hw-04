import { RotatingLines } from "react-loader-spinner";

import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="black"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
