export default function CorrectingInput({ key = '', item, styles, onChange }) {
    return (
        <input
            {...(key && { key: key })}
            value={item.value}
            type="number"
            onChange={(e) =>
                onChange({
                    name: item,
                    value: e.target.value,
                })
            }
            onBlur={() => {
                const min = item.min || 0;
                const step = item.step || 1;
                let value = Math.max(
                    Math.round((item.value - min) / step) * step + min,
                    min,
                );
                value = item.max ? Math.min(value, item.max) : value;
                onChange({
                    name: item,
                    value: value,
                });
            }}
            className={styles}
        />
    );
}
