const InputField = ({ label, type, name, handleChange }) => (
    <div className="flex justify-between items-center mb-4">
      <label className="text-sm text-gray-600 mr-2 min-w-[80px]" htmlFor={name}>{label}:</label>
      <input className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={label} type={type} id={name} name={name} onChange={handleChange} />
    </div>
  );
  
  export default InputField;