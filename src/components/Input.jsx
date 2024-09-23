export default function Input({name , label , inputType}) {
  return(
    <div className="control"> 
      <label htmlFor={name}>{label}</label>
      <input type={inputType} name={name} required />
    </div>
  )
}