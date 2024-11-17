import { useState, useRef } from "react"
import "./login.css"
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [ltoggle, setLtoggle] = useState(true);
    const [f_email, setF_email] = useState("");
    const [forgetPassword, setForgetPassword] = useState(false);
    const [loginCred, setLoginCred] = useState({});
    const [register, setRegister] = useState({});
    const navigate  = useNavigate();
    const mailRef = useRef();

    const handleLogin = async(e) =>{
        e.preventDefault();
        if(loginCred){

            try{
               await signInWithEmailAndPassword(auth,loginCred.email,loginCred.pwd);
               console.log("Logged in");
               navigate("/home");
            }catch(error){
                console.log(error);
            }
        
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(register && register.pwd === register.re_pwd){
            try{
                const res = await createUserWithEmailAndPassword(auth,register.email,register.pwd);

                await setDoc(doc(db, "users", res.user.uid),{
                    email : register.email,
                    id : res.user.uid,
                    books : [],
                });
                console.log("Account has been created successfully");
                setRegister({})
            }catch(error){
                console.log(error)
            }
        }
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
          await sendPasswordResetEmail(auth, f_email);
          console.log('Password reset email sent!');
          setForgetPassword(false);
          setF_email("");
        } catch (error) {
          console.log('Error sending password reset email.');
        }
      };

    return(
        <div className="login-container">
            <div className="l-min-container">
                {ltoggle ? 
                    forgetPassword ?
                        (
                            <div style={{
                                display:"flex",
                                flexDirection : "column",
                                alignItems : "center"
                            }}>
                                <h1>Forgot Password</h1>
                                <input className="fp-i" type="email" placeholder="Enter your registered email" onChange={(e)=>setF_email(e.target.value)}/>
                                <button onClick={handlePasswordReset}>Continue</button>
                            </div>
                        )
                        :
                        (<form onSubmit = {handleLogin}>
                        <input type="email" placeholder="example@gmail.com"  onChange={(e)=>setLoginCred({...loginCred, email : e.target.value})} />
                        <input type="password" placeholder="Enter Password"  onChange={(e)=>setLoginCred({...loginCred, pwd : e.target.value})}/>
                        <p className="l-fp"onClick={()=>setForgetPassword(true)} style={{color:"blue"}}>Forgot Password</p>
                        <input className="l-sub-btn" type="submit" placeholder="Submit" />
                        <p className="l-para">Didn't have an account? <span onClick={()=>setLtoggle(false)} style={{color:"blue"}}>Register</span></p>
                    </form>)
            
                 : (<form onSubmit={handleSubmit}>
                    <input type="email" placeholder="example@gmail.com"  onChange={(e)=>setRegister({...register,email:e.target.value})}/>
                    <input type="password" placeholder="Enter Password"  onChange = {(e)=>setRegister({...register,pwd : e.target.value})}/>
                    <input type="password" placeholder="Re-enter Password" onChange={(e)=>setRegister({...register, re_pwd : e.target.value})}/>
                    <input className="l-sub-btn" type="submit" placeholder="Submit" />
                    <p className="l-para">Already have an account? <span onClick={()=>setLtoggle(true) } style={{color:"blue"}}>Login</span></p>
                </form>)}
            </div>
        </div>
    )
}