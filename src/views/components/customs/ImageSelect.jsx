export default function ImageSelect({ value, onChange, options }) {
    return (
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option value={option.value}>
                    <img src={option.image} alt={option.value}></img>
                </option>
            ))}
        </select>
    );
}
