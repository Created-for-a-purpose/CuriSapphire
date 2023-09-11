export default function Input({ label, value, onChange }) {
    return (
      <div className="label_container">
        <label className="label_container__label">{label} *</label>
        <input
          type="text"
          className="label_container__input_text"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }