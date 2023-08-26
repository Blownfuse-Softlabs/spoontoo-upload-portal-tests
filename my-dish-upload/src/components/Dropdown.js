const Dropdown = ({ label, name, options, handleChange }) => (
    <div className="flex justify-between items-center mb-4">
      <label className="text-sm text-gray-600 mr-2" htmlFor={name}>{label}:</label>
      <select id={name} name={name} onChange={handleChange} className="border p-2 rounded w-full">
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
  
  export default Dropdown;
  