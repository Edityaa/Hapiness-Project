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

// --- LOGIN SCREEN ---
const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn("google");
  };

  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-600/8 rounded-full blur-[80px] sm:blur-[120px]"/>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}}/>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <div className="size-14 sm:size-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40 mb-4 sm:mb-5">
            <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png" className="text-white" size={26} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">Birthday Bot</h1>
          <p className="text-[9px] font-black text-indigo-500 tracking-[0.35em] uppercase mt-1 opacity-80">Amity Centre for Happiness</p>
        </div>

        <div className="bg-[#0c0d0f] border border-white/[0.06] rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-10 shadow-2xl shadow-black/60">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-2">Welcome back.</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Sign in with your Google account to access the celebration engine.</p>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-100 disabled:opacity-60 text-[#1a1a1a] py-4 sm:py-5 px-6 sm:px-8 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {isLoading ? (
              <>
                <div className="size-5 border-2 border-[#1a1a1a]/20 border-t-[#1a1a1a] rounded-full animate-spin"/>
                <span>Redirecting to Google…</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 my-6 sm:my-8">
            <div className="flex-1 h-px bg-white/5"/>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Secured by Google</span>
            <div className="flex-1 h-px bg-white/5"/>
          </div>

          <p className="text-center text-[11px] text-slate-600 font-medium leading-relaxed">
            By signing in, you agree to our{' '}
            <span className="text-slate-400 cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="text-slate-400 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          {['SOC 2', 'GDPR', 'SSO Ready'].map(tag => (
            <div key={tag} className="flex items-center gap-1.5 sm:gap-2">
              <div className="size-1.5 rounded-full bg-green-500/60"/>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-700 uppercase tracking-widest">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ADD TEAMMATE MODAL ---
const AddTeammateModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', role: '', birthday: '', email: '' });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-black/80 backdrop-blur-xl">
      {/* On mobile: sheet from bottom. On sm+: centered modal */}
      <div className="bg-[#0f1115] border border-white/10 w-full sm:max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-indigo-500/10 max-h-[90vh] overflow-y-auto">
        {/* Drag handle for mobile */}
        <div className="flex justify-center mb-6 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20"/>
        </div>

        <div className="size-12 sm:size-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-indigo-500/20">
          <UserPlus className="text-indigo-400" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Onboard Talent</h2>
        <p className="text-slate-500 text-sm mb-8 sm:mb-10 font-medium">Record a new milestone in the central celebration ledger.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(formData);
            onClose();
            setFormData({ name: '', role: '', birthday: '', email: '' });
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity</label>
            <input required value={formData.name} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm" placeholder="Enter Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Professional Role</label>
            <input required value={formData.role} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm" placeholder="e.g. Senior Architect" onChange={(e) => setFormData({...formData, role: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <input required value={formData.email} type="email" className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm" placeholder="colleague@company.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Event Date</label>
            <input required value={formData.birthday} type="date" className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all text-sm" onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-500 font-bold hover:text-white transition-colors text-sm">Dismiss</button>
            <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:-translate-y-1 transition-all text-sm">Commit Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- TOAST NOTIFICATION ---
const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:w-auto z-[200] flex items-center gap-4 px-5 py-4 rounded-2xl shadow-2xl border font-bold text-sm transition-all
      ${type === 'success'
        ? 'bg-[#0f1115] border-green-500/30 text-green-400 shadow-green-500/10'
        : 'bg-[#0f1115] border-red-500/30 text-red-400 shadow-red-500/10'
      }`}>
      {type === 'success'
        ? <CheckCircle size={18} className="shrink-0"/>
        : <Mail size={18} className="shrink-0"/>
      }
      {message}
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const { data: session, status } = useSession();
  const [view, setView] = useState('home');
  const [teammates, setTeammates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendingKey, setSendingKey] = useState(null);
  const [sentKeys, setSentKeys] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!session) return;
    fetch('/api/teammates')
      .then(res => res.json())
      .then(data => setTeammates(data || []))
      .catch(() => {});
  }, [session]);

  const handleAdd = async (data) => {
    const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase();
    try {
      const res = await fetch('/api/teammates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, initials })
      });
      if (res.ok) {
        const saved = await res.json();
        setTeammates(prev => [saved, ...prev]);
      }
    } catch {
      setTeammates(prev => [{ ...data, initials, id: Date.now() }, ...prev]);
    }
  };

  const handleSendBirthday = async (teammate) => {
    const key = teammate.email || teammate.name;
    if (!teammate.email) {
      setToast({ message: 'No email address on record.', type: 'error' });
      return;
    }
    setSendingKey(key);
    try {
      const res = await fetch('/api/send-birthday', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: teammate.email,
          toName: teammate.name,
          fromName: session.user.name,
        }),
      });

      if (res.ok) {
        setSentKeys(prev => [...prev, key]);
        setToast({ message: `🎉 Birthday wishes sent to ${teammate.name}!`, type: 'success' });
      } else {
        const err = await res.json();
        setToast({ message: err?.error || 'Failed to send email.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setSendingKey(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
        <div className="size-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"/>
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  const firstName = session.user.name?.split(' ')[0] || 'there';
  const initials = session.user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??';

  const navItems = [
    { id: 'home', icon: <Hash size={20}/>, label: 'Home' },
    { id: 'teammates', icon: <Users size={20}/>, label: 'Contacts' },
    { id: 'calendar', icon: <CalendarIcon size={20}/>, label: 'Event Horizon' },
  ];

  return (
    <div className="min-h-screen bg-[#08090a] text-slate-400 font-sans">

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}

      {/* ─── DESKTOP SIDEBAR (hidden on mobile) ─── */}
      <nav className="hidden sm:flex fixed left-0 top-0 bottom-0 w-20 lg:w-80 bg-[#0c0d0f] border-r border-white/5 flex-col p-6 lg:p-8 z-50">
        <div className="flex items-center gap-4 mb-12 lg:mb-16 px-2">
          <div className="size-11 lg:size-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 shrink-0">
            <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png" className="text-white" size={22} strokeWidth={2.5} />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Birthday Bot</h1>
            <p className="text-[9px] font-black text-indigo-500 tracking-[0.3em] uppercase opacity-80">Amity Centre For Happiness</p>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-5 px-4 lg:px-6 py-4 rounded-2xl transition-all group ${view === item.id ? 'bg-white/5 text-white border border-white/5' : 'hover:bg-white/5 text-slate-600'}`}>
              <span className={`shrink-0 ${view === item.id ? 'text-indigo-400' : 'group-hover:text-white'}`}>{item.icon}</span>
              <span className="hidden lg:block font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 lg:pt-8 border-t border-white/5 space-y-3">
          <div className="hidden lg:flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name} className="size-9 rounded-xl object-cover"/>
            ) : (
              <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-black">{initials}</div>
            )}
            <div className="min-w-0">
              <p className="text-white font-black text-sm truncate">{session.user.name}</p>
              <p className="text-slate-600 text-[10px] font-medium truncate">{session.user.email}</p>
            </div>
          </div>
          <button onClick={() => signOut()} className="w-full flex items-center gap-5 px-4 lg:px-6 py-3 text-slate-600 hover:text-red-400 transition-colors rounded-2xl hover:bg-red-500/5">
            <LogOut size={20} className="shrink-0"/>
            <span className="hidden lg:block font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* ─── MOBILE TOP BAR ─── */}
      <header className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-[#0c0d0f]/95 backdrop-blur-xl border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40">
            <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png" className="text-white" size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-black text-white tracking-tighter uppercase italic leading-none">Birthday Bot </h1>
            <p className="text-[8px] font-black text-indigo-500 tracking-[0.25em] uppercase opacity-80">Amity Centre for Hap</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name} className="size-9 rounded-xl object-cover border border-white/10"/>
          ) : (
            <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-black">{initials}</div>
          )}
        </div>
      </header>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0d0f]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex items-center justify-around safe-area-inset-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all ${view === item.id ? 'text-indigo-400' : 'text-slate-600'}`}
          >
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        <button
          onClick={() => signOut()}
          className="flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all text-slate-700 hover:text-red-400"
        >
          <LogOut size={20}/>
          <span className="text-[9px] font-black uppercase tracking-widest">Out</span>
        </button>
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      {/* Mobile: top bar (56px) + content + bottom nav (68px). Desktop: sidebar offset */}
      <main className="pt-[72px] pb-[88px] sm:pt-0 sm:pb-0 sm:ml-20 lg:ml-80 p-4 sm:p-8 lg:p-16">

        {/* HOME */}
        {view === 'home' && (
          <div className="max-w-6xl">
            <div className="flex items-end justify-between mb-10 sm:mb-16 mt-2 sm:mt-0">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-3 sm:mb-4">
                  Hello, <br/><span className="text-indigo-500 italic">{firstName}.</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-500 font-medium">Monitoring {teammates.length} records.</p>
              </div>
              <div className="hidden lg:flex size-24 border-2 border-dashed border-white/10 rounded-full items-center justify-center">
                <ArrowUpRight className="text-white/20" size={32} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-[#0c0d0f] border border-white/5 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] hover:border-indigo-500/30 transition-all group">
                <div className="size-11 sm:size-12 bg-white/5 rounded-2xl mb-5 sm:mb-6 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                  <Bell size={20} className="text-indigo-500"/>
                </div>
                <h3 className="text-3xl font-black text-white mb-1">2</h3>
                <p className="text-xs font-black uppercase text-slate-500 tracking-widest">Active Today</p>
              </div>

              <div className="bg-[#0c0d0f] border border-white/5 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] sm:col-span-2 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 italic">Automate Joy.</h3>
                  <p className="text-slate-500 text-sm font-medium mb-6 sm:mb-8">Ready to sync team birthdays with the notification engine?</p>
                  <button onClick={() => setView('teammates')} className="bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Access Assets</button>
                </div>
                <div className="absolute -right-10 -bottom-10 size-64 bg-indigo-600/10 blur-[100px] group-hover:bg-indigo-600/20 transition-all"/>
              </div>
            </div>
          </div>
        )}

        {/* TEAMMATES */}
        {view === 'teammates' && (
          <div className="space-y-5 sm:space-y-8">
            <header className="flex justify-between items-center bg-[#0c0d0f]/60 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">Contacts</h2>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500 inline-block"/> Centralized Directory
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="size-14 sm:size-16 bg-white text-black rounded-2xl sm:rounded-3xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:rotate-90"
              >
                <Plus size={28} strokeWidth={3}/>
              </button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {teammates.map((t, i) => {
                const key = t.email || t.name;
                return (
                  <div key={t.id || i} className="group bg-[#0c0d0f]/40 border border-white/5 hover:border-white/20 p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] transition-all">
                    {/* Stack vertically on mobile, row on sm+ */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Top row on mobile: avatar + name + role */}
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="size-16 sm:size-20 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center font-black text-white text-xl sm:text-2xl border border-white/5 group-hover:border-indigo-500/50 transition-all uppercase shrink-0">
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-white text-lg sm:text-xl tracking-tight mb-1 truncate">{t.name}</h4>
                          <p className="text-slate-600 font-black text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full inline-block mb-1.5">{t.role}</p>
                          {t.email && (
                            <p className="text-slate-600 text-[10px] font-medium truncate max-w-[200px]">{t.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Bottom row on mobile: date + button side by side */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:shrink-0 sm:ml-4">
                        <div className="sm:text-right">
                          <p className="text-indigo-400 font-black text-xs tracking-widest uppercase mb-0.5">Anniversary</p>
                          <p className="text-white font-black text-base sm:text-lg">{t.birthday}</p>
                        </div>

                        <button
                          onClick={() => handleSendBirthday(t)}
                          disabled={sendingKey === key || sentKeys.includes(key)}
                          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:cursor-not-allowed whitespace-nowrap
                            ${sentKeys.includes(key)
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20 disabled:opacity-50'
                            }`}
                        >
                          {sendingKey === key ? (
                            <>
                              <Loader size={13} className="animate-spin shrink-0"/>
                              <span>Sending…</span>
                            </>
                          ) : sentKeys.includes(key) ? (
                            <>
                              <CheckCircle size={13} className="shrink-0"/>
                              <span>Sent!</span>
                            </>
                          ) : (
                            <>
                              <Gift size={13} className="shrink-0"/>
                              <span>Send Wishes</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {teammates.length === 0 && (
                <div className="xl:col-span-2 flex flex-col items-center justify-center py-20 sm:py-24 text-center">
                  <div className="size-16 sm:size-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-5 sm:mb-6">
                    <Users size={28} className="text-slate-700"/>
                  </div>
                  <p className="text-slate-600 font-black text-sm uppercase tracking-widest mb-2">No Assets Recorded</p>
                  <p className="text-slate-700 text-xs font-medium">Tap the + button to onboard your first teammate.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {view === 'calendar' && (
          <div className="space-y-5 sm:space-y-8">
            <header className="flex justify-between items-center bg-[#0c0d0f]/60 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">Event Horizon</h2>
                <p className="text-indigo-500 font-black uppercase tracking-[0.3em] text-[10px] mt-2">
                  {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-white"><ChevronLeft size={20}/></button>
                <button className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-white"><ChevronRight size={20}/></button>
              </div>
            </header>

            {/* Day labels: abbreviate further on mobile */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-4">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-center text-[9px] sm:text-[10px] font-black text-slate-700 uppercase pb-3 sm:pb-4 tracking-[0.2em] sm:tracking-[0.3em]">{d}</div>
              ))}
              {(() => {
                const now = new Date();
                const month = now.getMonth();
                const year = now.getFullYear();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const firstDay = new Date(year, month, 1).getDay();
                const grid = [];
                for (let x = 0; x < firstDay; x++) grid.push(<div key={`e-${x}`} className="aspect-square"/>);
                for (let d = 1; d <= daysInMonth; d++) {
                  const bdays = teammates.filter(t => {
                    if (!t.birthday) return false;
                    const p = t.birthday.split('-');
                    return parseInt(p[1]) - 1 === month && parseInt(p[2]) === d;
                  });
                  grid.push(
                    <div key={d} className="aspect-square relative overflow-hidden bg-[#0c0d0f]/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-2 sm:p-4 flex flex-col hover:bg-[#15171a] transition-all">
                      <span className="text-[9px] sm:text-xs font-black mb-1 sm:mb-4 text-slate-700">{d}</span>
                      <div className="mt-auto space-y-1 sm:space-y-2">
                        {bdays.map((b, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl">
                            {/* Mobile: dot only. Desktop: full card */}
                            <div className="hidden sm:flex items-center gap-3">
                              <div className="size-2 rounded-full bg-indigo-500 shrink-0"/>
                              <div className="min-w-0">
                                <p className="text-[10px] font-black text-white uppercase leading-none truncate">{b.name}</p>
                                <p className="text-[7px] font-bold text-slate-600 uppercase mt-1 truncate">{b.role}</p>
                              </div>
                            </div>
                            {/* Mobile: just the dot */}
                            <div className="flex sm:hidden justify-center">
                              <div className="size-1.5 rounded-full bg-indigo-500"/>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return grid;
              })()}
            </div>

            {/* Mobile: birthday list below calendar */}
            {teammates.length > 0 && (
              <div className="sm:hidden space-y-3">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">This Month</p>
                {teammates.filter(t => {
                  if (!t.birthday) return false;
                  const p = t.birthday.split('-');
                  return parseInt(p[1]) - 1 === new Date().getMonth();
                }).map((t, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#0c0d0f]/60 border border-white/5 p-4 rounded-2xl">
                    <div className="size-2 rounded-full bg-indigo-500 shrink-0"/>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-black text-sm truncate">{t.name}</p>
                      <p className="text-slate-600 text-[10px] font-bold uppercase">{t.birthday}</p>
                    </div>
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">{t.role}</span>
                  </div>
                ))}
                {teammates.filter(t => {
                  if (!t.birthday) return false;
                  const p = t.birthday.split('-');
                  return parseInt(p[1]) - 1 === new Date().getMonth();
                }).length === 0 && (
                  <p className="text-slate-700 text-xs font-medium text-center py-4">No birthdays this month.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <AddTeammateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}"use client"
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

// --- LOGIN SCREEN ---
const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn("google");
  };

  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-600/8 rounded-full blur-[80px] sm:blur-[120px]"/>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}}/>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <div className="size-14 sm:size-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40 mb-4 sm:mb-5">
            <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png" className="text-white" size={26} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">Birthday Bot</h1>
          <p className="text-[9px] font-black text-indigo-500 tracking-[0.35em] uppercase mt-1 opacity-80">Amity Centre for Happiness</p>
        </div>

        <div className="bg-[#0c0d0f] border border-white/[0.06] rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-10 shadow-2xl shadow-black/60">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-2">Welcome back.</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Sign in with your Google account to access the celebration engine.</p>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-100 disabled:opacity-60 text-[#1a1a1a] py-4 sm:py-5 px-6 sm:px-8 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {isLoading ? (
              <>
                <div className="size-5 border-2 border-[#1a1a1a]/20 border-t-[#1a1a1a] rounded-full animate-spin"/>
                <span>Redirecting to Google…</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 my-6 sm:my-8">
            <div className="flex-1 h-px bg-white/5"/>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Secured by Google</span>
            <div className="flex-1 h-px bg-white/5"/>
          </div>

          <p className="text-center text-[11px] text-slate-600 font-medium leading-relaxed">
            By signing in, you agree to our{' '}
            <span className="text-slate-400 cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="text-slate-400 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          {['SOC 2', 'GDPR', 'SSO Ready'].map(tag => (
            <div key={tag} className="flex items-center gap-1.5 sm:gap-2">
              <div className="size-1.5 rounded-full bg-green-500/60"/>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-700 uppercase tracking-widest">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ADD TEAMMATE MODAL ---
const AddTeammateModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', role: '', birthday: '', email: '' });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-black/80 backdrop-blur-xl">
      {/* On mobile: sheet from bottom. On sm+: centered modal */}
      <div className="bg-[#0f1115] border border-white/10 w-full sm:max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-indigo-500/10 max-h-[90vh] overflow-y-auto">
        {/* Drag handle for mobile */}
        <div className="flex justify-center mb-6 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20"/>
        </div>

        <div className="size-12 sm:size-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-indigo-500/20">
          <UserPlus className="text-indigo-400" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Onboard Talent</h2>
        <p className="text-slate-500 text-sm mb-8 sm:mb-10 font-medium">Record a new milestone in the central celebration ledger.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(formData);
            onClose();
            setFormData({ name: '', role: '', birthday: '', email: '' });
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity</label>
            <input required value={formData.name} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm" placeholder="Enter Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Professional Role</label>
            <input required value={formData.role} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm" placeholder="e.g. Senior Architect" onChange={(e) => setFormData({...formData, role: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <input required value={formData.email} type="email" className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm" placeholder="colleague@company.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Event Date</label>
            <input required value={formData.birthday} type="date" className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all text-sm" onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-500 font-bold hover:text-white transition-colors text-sm">Dismiss</button>
            <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:-translate-y-1 transition-all text-sm">Commit Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- TOAST NOTIFICATION ---
const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:w-auto z-[200] flex items-center gap-4 px-5 py-4 rounded-2xl shadow-2xl border font-bold text-sm transition-all
      ${type === 'success'
        ? 'bg-[#0f1115] border-green-500/30 text-green-400 shadow-green-500/10'
        : 'bg-[#0f1115] border-red-500/30 text-red-400 shadow-red-500/10'
      }`}>
      {type === 'success'
        ? <CheckCircle size={18} className="shrink-0"/>
        : <Mail size={18} className="shrink-0"/>
      }
      {message}
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const { data: session, status } = useSession();
  const [view, setView] = useState('home');
  const [teammates, setTeammates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendingKey, setSendingKey] = useState(null);
  const [sentKeys, setSentKeys] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!session) return;
    fetch('/api/teammates')
      .then(res => res.json())
      .then(data => setTeammates(data || []))
      .catch(() => {});
  }, [session]);

  const handleAdd = async (data) => {
    const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase();
    try {
      const res = await fetch('/api/teammates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, initials })
      });
      if (res.ok) {
        const saved = await res.json();
        setTeammates(prev => [saved, ...prev]);
      }
    } catch {
      setTeammates(prev => [{ ...data, initials, id: Date.now() }, ...prev]);
    }
  };

  const handleSendBirthday = async (teammate) => {
    const key = teammate.email || teammate.name;
    if (!teammate.email) {
      setToast({ message: 'No email address on record.', type: 'error' });
      return;
    }
    setSendingKey(key);
    try {
      const res = await fetch('/api/send-birthday', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: teammate.email,
          toName: teammate.name,
          fromName: session.user.name,
        }),
      });

      if (res.ok) {
        setSentKeys(prev => [...prev, key]);
        setToast({ message: `🎉 Birthday wishes sent to ${teammate.name}!`, type: 'success' });
      } else {
        const err = await res.json();
        setToast({ message: err?.error || 'Failed to send email.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setSendingKey(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
        <div className="size-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"/>
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  const firstName = session.user.name?.split(' ')[0] || 'there';
  const initials = session.user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??';

  const navItems = [
    { id: 'home', icon: <Hash size={20}/>, label: 'Home' },
    { id: 'teammates', icon: <Users size={20}/>, label: 'Contacts' },
    { id: 'calendar', icon: <CalendarIcon size={20}/>, label: 'Event Horizon' },
  ];

  return (
    <div className="min-h-screen bg-[#08090a] text-slate-400 font-sans">

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}

      {/* ─── DESKTOP SIDEBAR (hidden on mobile) ─── */}
      <nav className="hidden sm:flex fixed left-0 top-0 bottom-0 w-20 lg:w-80 bg-[#0c0d0f] border-r border-white/5 flex-col p-6 lg:p-8 z-50">
        <div className="flex items-center gap-4 mb-12 lg:mb-16 px-2">
          <div className="size-11 lg:size-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 shrink-0">
            <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png" className="text-white" size={22} strokeWidth={2.5} />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Birthday Bot</h1>
            <p className="text-[9px] font-black text-indigo-500 tracking-[0.3em] uppercase opacity-80">Amity Centre For Happiness</p>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-5 px-4 lg:px-6 py-4 rounded-2xl transition-all group ${view === item.id ? 'bg-white/5 text-white border border-white/5' : 'hover:bg-white/5 text-slate-600'}`}>
              <span className={`shrink-0 ${view === item.id ? 'text-indigo-400' : 'group-hover:text-white'}`}>{item.icon}</span>
              <span className="hidden lg:block font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 lg:pt-8 border-t border-white/5 space-y-3">
          <div className="hidden lg:flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name} className="size-9 rounded-xl object-cover"/>
            ) : (
              <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-black">{initials}</div>
            )}
            <div className="min-w-0">
              <p className="text-white font-black text-sm truncate">{session.user.name}</p>
              <p className="text-slate-600 text-[10px] font-medium truncate">{session.user.email}</p>
            </div>
          </div>
          <button onClick={() => signOut()} className="w-full flex items-center gap-5 px-4 lg:px-6 py-3 text-slate-600 hover:text-red-400 transition-colors rounded-2xl hover:bg-red-500/5">
            <LogOut size={20} className="shrink-0"/>
            <span className="hidden lg:block font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* ─── MOBILE TOP BAR ─── */}
      <header className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-[#0c0d0f]/95 backdrop-blur-xl border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40">
            <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png" className="text-white" size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-black text-white tracking-tighter uppercase italic leading-none">Birthday Bot </h1>
            <p className="text-[8px] font-black text-indigo-500 tracking-[0.25em] uppercase opacity-80">Amity Centre for Hap</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name} className="size-9 rounded-xl object-cover border border-white/10"/>
          ) : (
            <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-black">{initials}</div>
          )}
        </div>
      </header>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0d0f]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex items-center justify-around safe-area-inset-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all ${view === item.id ? 'text-indigo-400' : 'text-slate-600'}`}
          >
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        <button
          onClick={() => signOut()}
          className="flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all text-slate-700 hover:text-red-400"
        >
          <LogOut size={20}/>
          <span className="text-[9px] font-black uppercase tracking-widest">Out</span>
        </button>
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      {/* Mobile: top bar (56px) + content + bottom nav (68px). Desktop: sidebar offset */}
      <main className="pt-[72px] pb-[88px] sm:pt-0 sm:pb-0 sm:ml-20 lg:ml-80 p-4 sm:p-8 lg:p-16">

        {/* HOME */}
        {view === 'home' && (
          <div className="max-w-6xl">
            <div className="flex items-end justify-between mb-10 sm:mb-16 mt-2 sm:mt-0">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-3 sm:mb-4">
                  Hello, <br/><span className="text-indigo-500 italic">{firstName}.</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-500 font-medium">Monitoring {teammates.length} records.</p>
              </div>
              <div className="hidden lg:flex size-24 border-2 border-dashed border-white/10 rounded-full items-center justify-center">
                <ArrowUpRight className="text-white/20" size={32} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-[#0c0d0f] border border-white/5 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] hover:border-indigo-500/30 transition-all group">
                <div className="size-11 sm:size-12 bg-white/5 rounded-2xl mb-5 sm:mb-6 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                  <Bell size={20} className="text-indigo-500"/>
                </div>
                <h3 className="text-3xl font-black text-white mb-1">2</h3>
                <p className="text-xs font-black uppercase text-slate-500 tracking-widest">Active Today</p>
              </div>

              <div className="bg-[#0c0d0f] border border-white/5 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] sm:col-span-2 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 italic">Automate Joy.</h3>
                  <p className="text-slate-500 text-sm font-medium mb-6 sm:mb-8">Ready to sync team birthdays with the notification engine?</p>
                  <button onClick={() => setView('teammates')} className="bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Access Assets</button>
                </div>
                <div className="absolute -right-10 -bottom-10 size-64 bg-indigo-600/10 blur-[100px] group-hover:bg-indigo-600/20 transition-all"/>
              </div>
            </div>
          </div>
        )}

        {/* TEAMMATES */}
        {view === 'teammates' && (
          <div className="space-y-5 sm:space-y-8">
            <header className="flex justify-between items-center bg-[#0c0d0f]/60 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">Contacts</h2>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500 inline-block"/> Centralized Directory
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="size-14 sm:size-16 bg-white text-black rounded-2xl sm:rounded-3xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:rotate-90"
              >
                <Plus size={28} strokeWidth={3}/>
              </button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {teammates.map((t, i) => {
                const key = t.email || t.name;
                return (
                  <div key={t.id || i} className="group bg-[#0c0d0f]/40 border border-white/5 hover:border-white/20 p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] transition-all">
                    {/* Stack vertically on mobile, row on sm+ */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Top row on mobile: avatar + name + role */}
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="size-16 sm:size-20 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center font-black text-white text-xl sm:text-2xl border border-white/5 group-hover:border-indigo-500/50 transition-all uppercase shrink-0">
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-white text-lg sm:text-xl tracking-tight mb-1 truncate">{t.name}</h4>
                          <p className="text-slate-600 font-black text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full inline-block mb-1.5">{t.role}</p>
                          {t.email && (
                            <p className="text-slate-600 text-[10px] font-medium truncate max-w-[200px]">{t.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Bottom row on mobile: date + button side by side */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:shrink-0 sm:ml-4">
                        <div className="sm:text-right">
                          <p className="text-indigo-400 font-black text-xs tracking-widest uppercase mb-0.5">Anniversary</p>
                          <p className="text-white font-black text-base sm:text-lg">{t.birthday}</p>
                        </div>

                        <button
                          onClick={() => handleSendBirthday(t)}
                          disabled={sendingKey === key || sentKeys.includes(key)}
                          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:cursor-not-allowed whitespace-nowrap
                            ${sentKeys.includes(key)
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20 disabled:opacity-50'
                            }`}
                        >
                          {sendingKey === key ? (
                            <>
                              <Loader size={13} className="animate-spin shrink-0"/>
                              <span>Sending…</span>
                            </>
                          ) : sentKeys.includes(key) ? (
                            <>
                              <CheckCircle size={13} className="shrink-0"/>
                              <span>Sent!</span>
                            </>
                          ) : (
                            <>
                              <Gift size={13} className="shrink-0"/>
                              <span>Send Wishes</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {teammates.length === 0 && (
                <div className="xl:col-span-2 flex flex-col items-center justify-center py-20 sm:py-24 text-center">
                  <div className="size-16 sm:size-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-5 sm:mb-6">
                    <Users size={28} className="text-slate-700"/>
                  </div>
                  <p className="text-slate-600 font-black text-sm uppercase tracking-widest mb-2">No Assets Recorded</p>
                  <p className="text-slate-700 text-xs font-medium">Tap the + button to onboard your first teammate.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {view === 'calendar' && (
          <div className="space-y-5 sm:space-y-8">
            <header className="flex justify-between items-center bg-[#0c0d0f]/60 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">Event Horizon</h2>
                <p className="text-indigo-500 font-black uppercase tracking-[0.3em] text-[10px] mt-2">
                  {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-white"><ChevronLeft size={20}/></button>
                <button className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-white"><ChevronRight size={20}/></button>
              </div>
            </header>

            {/* Day labels: abbreviate further on mobile */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-4">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-center text-[9px] sm:text-[10px] font-black text-slate-700 uppercase pb-3 sm:pb-4 tracking-[0.2em] sm:tracking-[0.3em]">{d}</div>
              ))}
              {(() => {
                const now = new Date();
                const month = now.getMonth();
                const year = now.getFullYear();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const firstDay = new Date(year, month, 1).getDay();
                const grid = [];
                for (let x = 0; x < firstDay; x++) grid.push(<div key={`e-${x}`} className="aspect-square"/>);
                for (let d = 1; d <= daysInMonth; d++) {
                  const bdays = teammates.filter(t => {
                    if (!t.birthday) return false;
                    const p = t.birthday.split('-');
                    return parseInt(p[1]) - 1 === month && parseInt(p[2]) === d;
                  });
                  grid.push(
                    <div key={d} className="aspect-square relative overflow-hidden bg-[#0c0d0f]/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-2 sm:p-4 flex flex-col hover:bg-[#15171a] transition-all">
                      <span className="text-[9px] sm:text-xs font-black mb-1 sm:mb-4 text-slate-700">{d}</span>
                      <div className="mt-auto space-y-1 sm:space-y-2">
                        {bdays.map((b, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl">
                            {/* Mobile: dot only. Desktop: full card */}
                            <div className="hidden sm:flex items-center gap-3">
                              <div className="size-2 rounded-full bg-indigo-500 shrink-0"/>
                              <div className="min-w-0">
                                <p className="text-[10px] font-black text-white uppercase leading-none truncate">{b.name}</p>
                                <p className="text-[7px] font-bold text-slate-600 uppercase mt-1 truncate">{b.role}</p>
                              </div>
                            </div>
                            {/* Mobile: just the dot */}
                            <div className="flex sm:hidden justify-center">
                              <div className="size-1.5 rounded-full bg-indigo-500"/>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return grid;
              })()}
            </div>

            {/* Mobile: birthday list below calendar */}
            {teammates.length > 0 && (
              <div className="sm:hidden space-y-3">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">This Month</p>
                {teammates.filter(t => {
                  if (!t.birthday) return false;
                  const p = t.birthday.split('-');
                  return parseInt(p[1]) - 1 === new Date().getMonth();
                }).map((t, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#0c0d0f]/60 border border-white/5 p-4 rounded-2xl">
                    <div className="size-2 rounded-full bg-indigo-500 shrink-0"/>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-black text-sm truncate">{t.name}</p>
                      <p className="text-slate-600 text-[10px] font-bold uppercase">{t.birthday}</p>
                    </div>
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">{t.role}</span>
                  </div>
                ))}
                {teammates.filter(t => {
                  if (!t.birthday) return false;
                  const p = t.birthday.split('-');
                  return parseInt(p[1]) - 1 === new Date().getMonth();
                }).length === 0 && (
                  <p className="text-slate-700 text-xs font-medium text-center py-4">No birthdays this month.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <AddTeammateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}"use client"
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
