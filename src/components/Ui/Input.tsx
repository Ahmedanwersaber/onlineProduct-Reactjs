import { InputHTMLAttributes } from "react"

 interface Iprops extends InputHTMLAttributes<HTMLInputElement>{

}

const Input = ({...rest}: Iprops) => {
  return (
   
  <input type="text" name='' id='' className='border-2 border-gray-100 rounded-md p-3 mb-2 shadow-lg text-l focus:outline-none focus:border-indigo-300' {...rest}/>

  )
}



export default Input
