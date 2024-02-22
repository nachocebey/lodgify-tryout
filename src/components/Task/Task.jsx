import PropTypes from "prop-types";
import "./styles.css";

export default function Task({
  description,
  checked,
  updateTask,
  taskIndex,
  groupIndex,
}) {
  const handleCheckboxChange = (event) => updateTask(event.target.checked);

  return (
    <>
      <input
        type="checkbox"
        id={`taskCheckbox-${groupIndex}-${taskIndex}`}
        name={`taskCheckbox-${groupIndex}-${taskIndex}`}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`taskCheckbox-${groupIndex}-${taskIndex}`}>
        {description}
      </label>
    </>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  updateTask: PropTypes.func.isRequired,
  taskIndex: PropTypes.number.isRequired,
  groupIndex: PropTypes.number.isRequired,
};
