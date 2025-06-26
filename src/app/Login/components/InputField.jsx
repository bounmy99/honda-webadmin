export default function InputField({ type, placeholder, value, onChange, icon }) {
  const getIcon = () => {
    if (icon === 'user') {
      return (
        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    }
    if (icon === 'lock') {
      return (
        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
        </svg>
      )
    }
  }

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 pr-16 bg-white border-0 rounded-xl shadow-md text-gray-800 placeholder-gray-500 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        {getIcon()}
      </div>
    </div>
  )
}