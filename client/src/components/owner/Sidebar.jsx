import React,{useState} from 'react'
import {  ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import edit_icon from '../../assets/edit_icon.svg'
import check_icon from '../../assets/check_icon.svg'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const Sidebar = () => {
    const {user, axios, fetchUser} = useAppContext
    const location = useLocation()
    const [image, setImage] = useState('')
    const updateImage = async() => {
       try {
        const formData = new FormData()
        formData.append('image', image)

        const{data} = await axios.post('/api/owner/update-image', formData)
        if(data.success){
          fetchUser()
          toast.success(data.message)
          setImage('')
        }else{
          toast.error(data.message)
        }
       } catch (error) {
        
       }
    }
  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
        <div className='group relative'>
            <label htmlFor='image' className='cursor-pointer'>
                <img src={image? URL.createObjectURL(image): user?.image ||" https://unsplash.com/photos/man-in-black-hoodie-wearing-black-framed-eyeglasses-3JmfENcL24M?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"} alt='' className='h-16 md:-16 w-16 md:w-16 rounded-full mx-auto'/>


                <div className='absolute inset-0 hidden justify-center bg-black/30 rounded-full group-hover:flex items-center '>
                <img src={edit_icon} alt=''/>

                </div>
            </label>
             <input 
             type='file'
              id='image'
              hidden 
              onChange={e=>setImage(e.target.files[0])}/>

        </div>
      {image && (
        <button className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'>Save <img src={check_icon} width={13} alt='' onClick={updateImage} /></button>
      )}
      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

      <div className='w-full'>
        {ownerMenuLinks.map((link, index)=>(
            <NavLink key={index} to={link.path} className={`relaative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname ? 'bg-primary/10' : 'text-gray-600'}`}>
                <img src={link.path === location.pathname ? link.coloredIcon: link.icon } alt='car icon'/>
                <span className='max-md:hidden'>{link.name}</span>
                <div className={`${link.path === location.pathname && 'bg-primary'} w-1.5 h-8 rounded-l right-0 absolute`}></div>
            </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
