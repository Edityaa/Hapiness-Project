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
        className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl font-bold"
      >
        {isLoading ? "Redirecting..." : <GoogleIcon />}
        Continue with Google
      </button>
    </div>
  );
};

/* ---------------- ADD TEAMMATE MODAL ---------------- */

const AddTeammateModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    birthday: "",
    email: ""
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="bg-[#0f1115] p-8 rounded-3xl w-full max-w-md">
        <h2 className="text-2xl text-white mb-6 font-bold">Add Teammate</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(formData);
            onClose();
            setFormData({
              name: "",
              role: "",
              birthday: "",
              email: ""
            });
          }}
          className="space-y-4"
        >
          <input
            required
            placeholder="Name"
            className="w-full p-3 rounded-xl bg-white/5 text-white"
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
          />

          <input
            required
            placeholder="Role"
            className="w-full p-3 rounded-xl bg-white/5 text-white"
            value={formData.role}
            onChange={(e)=>setFormData({...formData,role:e.target.value})}
          />

          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/5 text-white"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
          />

          <input
            type="date"
            required
            className="w-full p-3 rounded-xl bg-white/5 text-white"
            value={formData.birthday}
            onChange={(e)=>setFormData({...formData,birthday:e.target.value})}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-slate-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white rounded-xl py-2"
            >
              Save
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

  /* -------- LOAD FROM LOCAL STORAGE -------- */

  useEffect(()=>{

    if(!session) return;

    const stored = localStorage.getItem("teammates");

    if(stored){
      setTeammates(JSON.parse(stored));
    }

  },[session]);

  /* -------- ADD TEAMMATE -------- */

  const handleAdd = (data)=>{

    const initials = data.name
      .split(" ")
      .map(n=>n[0])
      .join("")
      .toUpperCase();

    const newTeammate = {
      ...data,
      initials,
      id: Date.now()
    };

    const updated = [newTeammate,...teammates];

    setTeammates(updated);

    localStorage.setItem(
      "teammates",
      JSON.stringify(updated)
    );
  };

  /* -------- SEND EMAIL -------- */

  const handleSendBirthday = async(teammate)=>{

    const key = teammate.email || teammate.name;

    if(!teammate.email){
      setToast({message:"No email address",type:"error"});
      return;
    }

    setSendingKey(key);

    try{

      const res = await fetch("/api/send-birthday",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          toEmail:teammate.email,
          toName:teammate.name,
          fromName:session.user.name
        })
      });

      if(res.ok){
        setSentKeys(prev=>[...prev,key]);
        setToast({message:`Sent to ${teammate.name}`,type:"success"});
      }

    }catch{
      setToast({message:"Network error",type:"error"});
    }

    setSendingKey(null);
  };

  /* -------- LOADING -------- */

  if(status==="loading"){
    return(
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if(!session) return <LoginScreen/>;

  const firstName = session.user.name?.split(" ")[0];

  /* -------- APP UI -------- */

  return(

  <div className="min-h-screen bg-[#08090a] text-white p-10">

    <h1 className="text-5xl font-black mb-8">
      Hello {firstName}
    </h1>

    <button
      onClick={()=>setIsModalOpen(true)}
      className="mb-8 bg-indigo-600 px-6 py-3 rounded-xl"
    >
      Add Teammate
    </button>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {teammates.map(t=>{

        const key = t.email || t.name;

        return(

        <div
          key={t.id}
          className="bg-[#0c0d0f] p-6 rounded-2xl border border-white/10"
        >

          <h3 className="text-xl font-bold">{t.name}</h3>

          <p className="text-slate-400">{t.role}</p>

          <p className="text-indigo-400">{t.birthday}</p>

          <button
            onClick={()=>handleSendBirthday(t)}
            disabled={sendingKey===key || sentKeys.includes(key)}
            className="mt-4 bg-indigo-600 px-4 py-2 rounded-xl"
          >

            {sendingKey===key
              ? "Sending..."
              : sentKeys.includes(key)
              ? "Sent!"
              : "Send Wishes"}

          </button>

        </div>

        )

      })}

    </div>

    <AddTeammateModal
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      onAdd={handleAdd}
    />

  </div>

  );

}
