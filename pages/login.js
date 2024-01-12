import Head from 'next/head'
import Layout from '../layout/layout'
import Link from'next/link'
import styles from '../styles/form.module.css';
import Image from 'next/image'
import{HiAtSymbol,HiFingerPrint}from "react-icons/hi";
import { useState } from 'react'
import {  signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../lib/validate'
import {useRouter}from'next/router';


export default function Login(){
    const[Show,setShow]=useState(false)
    const router= useRouter()
    //Formik Hook
    const formik= useFormik({
        initialValues: {
            email:'',
            password:''
          },
          validate:login_validate,
          onSubmit
    })
    
    async function onSubmit(values){
        console.log(values)
    }

    async function handleGoogleSignIn(){
        signIn('google', { callbackUrl: 'http://localhost:3000' })  
    }

    return(
        <Layout> 
            <Head>
            <title>Login</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className=' text-gray-800 text-4xl font-bold py-4'> Login</h1>
                    <p className='w-3/4 mx-auto text-gray-400 flex-col gap-10'> Welcome to YourWays delivery </p>
                </div>
                <form className='flex flex-col gap-5'onSubmit={formik.handleSubmit}>
                    <div className={'${styles.input_group}${formik.errors.email && formik.touched.email}'?'border-rose-600':''}>
                        <input type ="email" name='email'placeholder='Email' className={styles.input_text}{...formik.getFieldProps('email')}/>
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25}/></span>
                    </div>
                    <div className={'${styles.input_group}${formik.errors.password && formik.touched.password}'?'border-rose-600':''}>
                        <input type ='${show? "text":"password"}' name='password'placeholder='Password'className={styles.input_text}{...formik.getFieldProps('password')}/>
                        <span className='icon flex items-center px-4' on onClick={()=>setShow(!show)}><HiFingerPrint size={25}/></span>
                    </div>
                    {formik.errors.password && formik.touched.password? <span className='text-rose-500'>{formik.errors.password}</span>:<></>}
                    <div className="input-button">
                        <button type='submit'className={styles.button}>Login</button>
                    </div>
                    <div className="input-button">
                    <button  onClick={handleGoogleSignIn} type='submit' className={styles.button_custom}>Sign in with Google<Image src={'/assets/google.svg'}width="20"height="20"></Image></button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>Don't have an account yet?<Link href={'/register'}><a className='text-orange-600'>Sign up</a></Link></p>
            </section>
        </Layout>
    )
}

