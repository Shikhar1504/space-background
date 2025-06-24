export default function SpaceBackgroundDevTool(props) {
  const {
    twinkleSpeed,
    setTwinkleSpeed,
    starCount,
    setStarCount,
    clusterCount,
    setClusterCount,
    meteorAngle,
    setMeteorAngle,
    disableAnimation,
    setDisableAnimation,
  } = props;

  function createNumberInputHandler(min, max, setter) {
    return {
      onChange: (e) => {
        const value = e.target.value;

        // Allow empty input temporarily
        if (value === "") {
          setter("");
          return;
        }

        const num = Number(value);
        if (!isNaN(num)) {
          const clamped = Math.min(max, Math.max(min, num));
          setter(clamped);
        }
      },
      onBlur: (currentValue) => {
        // Reset to min if empty or invalid
        if (currentValue === "" || isNaN(Number(currentValue))) {
          setter(min);
        }
      },
    };
  }

  const starCountHandler = createNumberInputHandler(1, 500, setStarCount);
  const clusterCountHandler = createNumberInputHandler(1, 6, setClusterCount);

  return (
    <div className="space-devtool dark">
      <div className="section">
        <label>Twinkle Speed</label>
        <input
          type="range"
          min="0"
          max="100"
          value={100 - (twinkleSpeed - 100) * (100 / 1900)}
          onChange={(e) => {
            const sliderValue = Number(e.target.value);
            const inverted = 100 - sliderValue;
            const newSpeed = 100 + inverted * (1900 / 100);
            setTwinkleSpeed(newSpeed);
          }}
        />
      </div>

      <div className="section">
        <label>Star Count</label>
        <input
          type="number"
          value={starCount}
          onChange={starCountHandler.onChange}
          onBlur={() => starCountHandler.onBlur(starCount)}
        />
      </div>

      <div className="section">
        <label>Cluster Count</label>
        <input
          type="number"
          value={clusterCount}
          onChange={clusterCountHandler.onChange}
          onBlur={() => clusterCountHandler.onBlur(clusterCount)}
        />
      </div>

      <div className="section">
        <label>Meteor Angle</label>
        <input
          type="range"
          min="45"
          max="135"
          value={meteorAngle}
          onChange={(e) => setMeteorAngle(Number(e.target.value))}
        />
        <span className="text-xs">{meteorAngle}°</span>
      </div>

      <div className="flex">
        <label>Disable Animation</label>
        <input
          type="checkbox"
          checked={disableAnimation}
          onChange={(e) => setDisableAnimation(e.target.checked)}
        />
      </div>
    </div>
  );
}
