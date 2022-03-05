import "../ComponentVariables.css";
import styles from "./Wave.module.css";
export interface WaveProps {
  /**
   * To fit the water tank width
   */
  width: number;

  /**
   * Allows the wave to be positionate at the top of the water tank
   */
  top: number;

  /**
   * Wobble = Water animation
   */
  wobble: boolean;
}
export const Wave = (props: WaveProps) => {
  const TOP_HEIGHT = 40; // Maximum height of the top wave
  return (
    <div
      classList={{ [styles.Wave]: true, [styles.Wave_Wobble]: props.wobble }} // Allows to have the wave overflow hidden
      style={{
        top: `${props.top}px`,
        width: `${props.width}px`,
      }}
    >
      {/*Wave container that is moving left-right*/}
      <div class={styles.WaveContainer}>
        <svg
          classList={{ [styles.Svg]: true, [styles.Svg_Wobble]: props.wobble }}
          viewBox="0 0 1440 320" // Original size of the SVG
          preserveAspectRatio="none" // Allows the SVG to stretch
          width={`${props.width * 2}px`} // Double the width to allow for the wobble
          height={`${TOP_HEIGHT}px`}
        >
          <path
            fill="#0288d1"
            fill-opacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
