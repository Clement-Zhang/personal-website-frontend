export default function CorrectingInput({
    id = false,
    name,
    item,
    styles,
    onChange,
}) {
    return (
        <input
            {...(id && { id: name })}
            key={name}
            value={item.value}
            type="number"
            onChange={(e) => {
                console.log({
                    name: name,
                    value: e.target.value,
                });
                onChange({
                    name: name,
                    value: e.target.value,
                });
            }}
            onBlur={() => {
                const min = item.min || 0;
                const step = item.step || 1;
                let value = Math.max(
                    Math.round((item.value - min) / step) * step + min,
                    min,
                );
                value = item.max ? Math.min(value, item.max) : value;
                onChange({
                    name: name,
                    value: value,
                });
            }}
            className={styles}
        />
    );
}
