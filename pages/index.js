import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useFormik } from 'formik';
import {gestSession,useSession,signOut}from "next-auth/react"
import { useState } from 'react';



export default function Home() {
  
  const{data:session}=useSession()
  function handleSignOut(){
    signOut()
  }
  return(
  <div className={styles.contanier}>
    <Head>
      <tiltle>Home page</tiltle>
    </Head>
    {session ? User({session, handleSignOut}):Guest()}
  </div>
  )  
  }

  //GUEST
  function Guest(){
    return(
      <main className="container max-auto text-center py-20">
        <h3 className="text-4xl font-bold ">Guest Home Page </h3>
        <div className='flex justify-center'>
          <Link href={'/login'}><a className='mt-5 px-10 py-1 rounded-smbg-indigo-500 text-gray-50'>Sign In</a></Link>
        </div>
      </main>
    )
  }
  //AUTHORIZE USER
  function User({session,handleSignOut}){
    return(
      <main className="container max-auto text-center py-20">
        <h3 className="text-4xl font-bold ">AuthorizeUser Home Page </h3>
        <div className='details'>
          <h5>unkonwn</h5>
          <h5>unkonwn</h5>
        </div>
        <div className='flex justify-center'>
          <button onClick={handleSignOut}className='mt-5 px 10 py-1 rounded-sm bg-indigo-500'>Sign out</button>
        </div>
        <div className='flex justify-center'>
          <Link href={'/profile'}><a className='mt-5 px-10 py-1 rounded-smbg-indigo-500 text-gray-50'>Profile Page</a></Link>
        </div>
      </main>
    )
  }
  export async function getServerSideProps({req}){
    const session=await getsession({req})
    if(!session){
      return{
        redirect:{
          destination:'/login',
          permanent:false
        }
          
      }
    }
    return{
      props :{session}
    }
  }

