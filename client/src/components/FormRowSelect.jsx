const FormRowSelect = ({ name, labelText, defaultValue = '', list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((itemvalue) => {
          return (
            <option key={itemvalue} value={itemvalue}>
              {itemvalue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
