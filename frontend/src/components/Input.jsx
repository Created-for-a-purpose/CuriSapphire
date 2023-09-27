import "../styles/components/Input.scss"

export default function Input({ label, value, onChange, isRequired, type, placeholder }) {
    return (
      <div className="label_container">
        <label className="label_container__label">{label} {isRequired && "*"}</label>
        <input
          type={type}
          className="label_container__input_text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }