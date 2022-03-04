import styles from "./Wave.module.css";
export interface WaveProps {
  width: number;
  top: number;
  wobble: boolean
}
export const Wave = (props: WaveProps) => {
  const height = 40;

  return (
    <div
      class={styles.Wave}
      style={{
        top: `${props.top - height}px`,
      }}
    >
      <svg
        class={styles.Svg}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        width={`${props.width}px`}
        height={`${height}px`}
      >
        <path
          fill="#0288d1"
          fill-opacity="1"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};
