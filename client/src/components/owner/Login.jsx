import React from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate} = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onsubmitHandler = async(event)=>{
        try{
            event.preventDefault();
            const endpoint = state ==="signup" ?"register" :"login";
            const {data}= await axios.post(`/api/user/${endpoint}`,{name, email, password})
            if(data.success){
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }
        }catch(error){
           toast.error(error.message)
        }
    }

  return (
    <div onClick={()=> setShowLogin(false)} className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      
       <form onSubmit={onsubmitHandler} onClick={(e)=> e.stopPropagation( )} className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border  border-gray-200 p-8 py-12 w-80 sm:w-[352px]">
    <p className="text-2xl font-medium text-center">
        <span className="text-indigo-500">User</span>{state === "login" ? "Login" : "Sign Up"} 
    </p>

    {state !== "login" && (
        <div className='mt-4'>
           <label className='"block'>Name</label>
           <input 
           type='text'
           placeholder='Type here'
           className='border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500'
           />
        </div>
    )}

    <div className="mt-4">
        <label className="block">Email</label>
        <input type="email" placeholder="type here" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500">
                </input>
    </div>

    <div className="mt-4">
        <label className="block">Password</label>
        <input type="password" placeholder="type here" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500">
                </input>
    </div>

    <p className="mt-4">
       {state === "login" ? "create an account? " : "Already have an account? "}

       <span  onClick= {()=> setState(state === "login" ? "signup" : "login")}
        className= "text-indigo-500 cursor-pointer">
       Click here
       </span>
    </p>

    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer">
        {state === "login" ? "Login": "Sign Up"}
    </button>
</form>

    </div>
  )
}

export default Login
