export default function InputField({ placeholder, type = "text", className }) {
  return <input type={type} placeholder={placeholder} className={className} />;
}
