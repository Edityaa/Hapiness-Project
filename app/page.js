"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import {
  Gift, Users, Calendar as CalendarIcon,
  Plus, ChevronLeft, ChevronRight, UserPlus, Hash,
  Bell, LogOut, ArrowUpRight, Mail, CheckCircle, Loader
} from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/* ---------------- LOGIN SCREEN ---------------- */

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn("google");
  };

  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl font-bold"
      >
        <GoogleIcon/>
        {isLoading ? "Redirecting..." : "Continue with Google"}
      </button>
    </div>
  );
};

/* ---------------- ADD TEAMMATE MODAL ---------------- */

const AddTeammateModal = ({ isOpen, onClose, onAdd }) => {

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    birthday: '',
    email: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">

      <div className="bg-[#0f1115] p-10 rounded-3xl w-full max-w-lg">

        <h2 className="text-white text-2xl font-bold mb-6">Add Contact</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            onAdd(formData);

            setFormData({
              name:'',
              role:'',
              birthday:'',
              email:''
            });

            onClose();
          }}
          className="space-y-4"
        >

          <input
            required
            placeholder="Name"
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            className="w-full p-3 rounded-xl bg-white/5 text-white"
          />

          <input
            required
            placeholder="Role"
            value={formData.role}
            onChange={(e)=>setFormData({...formData,role:e.target.value})}
            className="w-full p-3 rounded-xl bg-white/5 text-white"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            className="w-full p-3 rounded-xl bg-white/5 text-white"
          />

          <input
            required
            type="date"
            value={formData.birthday}
            onChange={(e)=>setFormData({...formData,birthday:e.target.value})}
            className="w-full p-3 rounded-xl bg-white/5 text-white"
          />

          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-indigo-600 py-3 rounded-xl text-white"
            >
              Add
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

/* ---------------- MAIN APP ---------------- */

export default function App() {

  const { data: session, status } = useSession();

  const [view,setView] = useState("home");
  const [teammates,setTeammates] = useState([]);
  const [isModalOpen,setIsModalOpen] = useState(false);

  const [sendingKey,setSendingKey] = useState(null);
  const [sentKeys,setSentKeys] = useState([]);

  const [toast,setToast] = useState(null);

  /* ---------------- LOAD FROM LOCAL STORAGE ---------------- */

  useEffect(()=>{

    if(!session) return;

    const stored = localStorage.getItem("teammates");

    if(stored){
      setTeammates(JSON.parse(stored));
    }

  },[session]);

  /* ---------------- SAVE TO LOCAL STORAGE ---------------- */

  useEffect(()=>{
    localStorage.setItem("teammates",JSON.stringify(teammates));
  },[teammates]);


  /* ---------------- ADD CONTACT ---------------- */

  const handleAdd = (data)=>{

    const initials = data.name
      .split(" ")
      .map(n=>n[0])
      .join("")
      .toUpperCase();

    const newTeammate = {
      ...data,
      initials,
      id:Date.now()
    };

    setTeammates(prev=>[newTeammate,...prev]);
  };


  /* ---------------- SEND EMAIL ---------------- */

  const handleSendBirthday = async (t)=>{

    const key = t.email || t.name;

    if(!t.email){
      setToast({message:"No email",type:"error"});
      return;
    }

    setSendingKey(key);

    try{

      const res = await fetch("/api/send-birthday",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          toEmail:t.email,
          toName:t.name,
          fromName:session.user.name
        })
      });

      if(res.ok){

        setSentKeys(prev=>[...prev,key]);

        setToast({
          message:`Birthday wishes sent to ${t.name}`,
          type:"success"
        });

      }else{

        setToast({
          message:"Email failed",
          type:"error"
        });

      }

    }catch{

      setToast({
        message:"Network error",
        type:"error"
      });

    }

    setSendingKey(null);

  };


  /* ---------------- LOADING ---------------- */

  if(status==="loading"){

    return(
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
        <Loader className="animate-spin text-white"/>
      </div>
    );

  }


  if(!session) return <LoginScreen/>;


  const firstName = session.user.name?.split(" ")[0] || "User";


  /* ---------------- UI ---------------- */

  return (

    <div className="min-h-screen bg-[#08090a] text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        Hello {firstName}
      </h1>


      <button
        onClick={()=>setIsModalOpen(true)}
        className="bg-indigo-600 px-6 py-3 rounded-xl mb-10"
      >
        Add Contact
      </button>


      <div className="grid md:grid-cols-2 gap-6">

        {teammates.map(t=>{

          const key = t.email || t.name;

          return(

            <div
              key={t.id}
              className="bg-[#0c0d0f] p-6 rounded-3xl border border-white/10"
            >

              <h3 className="text-xl font-bold">{t.name}</h3>

              <p className="text-gray-400">{t.role}</p>

              <p className="text-gray-400">{t.email}</p>

              <p className="text-indigo-400">{t.birthday}</p>

              <button
                onClick={()=>handleSendBirthday(t)}
                disabled={sendingKey===key || sentKeys.includes(key)}
                className="mt-4 bg-indigo-600 px-4 py-2 rounded-xl flex items-center gap-2"
              >

                {sendingKey===key
                  ? <Loader size={14} className="animate-spin"/>
                  : sentKeys.includes(key)
                    ? <CheckCircle size={14}/>
                    : <Gift size={14}/>
                }

                {sentKeys.includes(key) ? "Sent" : "Send Wishes"}

              </button>

            </div>

          );

        })}

      </div>


      <AddTeammateModal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        onAdd={handleAdd}
      />


      <button
        onClick={()=>signOut()}
        className="fixed bottom-6 right-6 bg-red-600 px-5 py-3 rounded-xl"
      >
        Sign Out
      </button>

    </div>
  );
}
