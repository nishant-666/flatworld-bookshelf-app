import "./index.css";

export default function Input({ placeholder, onChange, name, value }: Input) {
  return (
    <div>
      <input
        value={value}
        name={name}
        onChange={onChange}
        className="common-input"
        placeholder={placeholder}
      />
    </div>
  );
}
