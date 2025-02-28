import React from 'react'
import { Container,PostForm } from "../components/index"
import service from '../appwrite/config'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'


function Editpost() {
    const [post,Setpost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            service.getpost(slug).then((post)=>{
                if(post){
                    Setpost(post)
                }
            })
        }
        else{
            navigate("/")
        }

    },[slug,navigate])
    return post?(
      <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>

      </div>):null
}

export default Editpost;
