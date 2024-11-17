import { useEffect, useState } from "react"
import "./write.css"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Write(){
    const [book, setBook] = useState({});
    const [current, setCurrent] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrent({email : user.email, id : user.uid});
            }
        })
    },[])
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!book){
            console.log("Enter values to proceed further");
        }
        try{
            await addDoc(collection(db, "books"),{
                email : current.email,
                id : current.id,
                title: book.title,
                author : book.author,
                genre : book.genre.split(","),
                condition : book.condition,
                availability : book.status
            });
            navigate("/home");
            console.log("Book uploded successsfully")
            setBook({})
        }catch(err){
            console.log(err.message);
        }
    }
    return(
        <div className="write-container">
            <form className="write-form" onSubmit={handleSubmit}>
                <input className="wf_input"  type = "text" placeholder="Title" onChange={(e)=>setBook((prev)=>({...prev,title : e.target.value}))} />
                <input className="wf_input" type = "text" placeholder="Author" onChange={(e)=>setBook((prev)=>({...prev,author : e.target.value}))}  />
                <input className="wf_input" type = "text" placeholder="Genre" onChange={(e)=>setBook((prev)=>({...prev,genre : e.target.value}))} />
                <input className="wf_input" type = "text" placeholder="Enter the current condition of the book" onChange={(e)=>setBook((prev)=>({...prev,condition : e.target.value}))} />
                <select className="wr-select" onChange={(e)=>setBook((prev)=>({...prev, status : e.target.value}))}>
                    <option>Availability status</option>
                    <option>Yes</option>
                    <option>no</option>
                </select>
                <input className="wr-btn" type="submit" />
            </form>
        </div>
    )
}