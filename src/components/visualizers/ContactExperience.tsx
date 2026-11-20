import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, MapPin, Phone, Send, Sparkles } from 'lucide-react';

export const ContactExperience: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "shreyashgupta401@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 my-4">
      {/* Invitation Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/30 via-space-900 to-space-900 border border-pink-500/20 text-xs text-neutral-300 space-y-2">
        <div className="flex items-center gap-2 text-pink-400 font-mono font-semibold text-[11px] uppercase tracking-wider">
          <Sparkles size={14} />
          Let&apos;s Build Something Meaningful Together
        </div>
        <p className="leading-relaxed">
          Have an interesting engineering problem to solve, an ambitious system to architect, or want to discuss machine learning, AML graph networks, or hackathon war stories? I&apos;d love to connect.
        </p>
      </div>

      {/* Primary Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Email Copy Card */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-white/10 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-pink-400">
                <Mail size={14} /> Email
              </span>
              <span>Direct Inbox</span>
            </div>
            <div className="text-sm font-mono text-white select-all break-all">{email}</div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyEmail}
              className="flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all flex items-center justify-center gap-1.5"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Address'}</span>
            </button>
            <a
              href={`mailto:${email}`}
              className="py-1.5 px-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-mono transition-all flex items-center justify-center gap-1"
            >
              <Send size={13} />
              <span>Mail</span>
            </a>
          </div>
        </div>

        {/* Location & Phone Card */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-white/10 flex flex-col justify-between space-y-3">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <MapPin size={15} className="text-cyan-400 flex-shrink-0" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Phone size={15} className="text-emerald-400 flex-shrink-0" />
              <span className="font-mono">+91 9321618045</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-neutral-500 border-t border-white/5 pt-2">
            Available for full-time engineering and ML roles globally / in India.
          </div>
        </div>
      </div>

      {/* Social and Repository Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href="https://www.linkedin.com/in/shreyash-gupta-b3a21025b"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-space-950/60 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
              <Linkedin size={18} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                LinkedIn Profile
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                shreyash-gupta-b3a21025b
              </div>
            </div>
          </div>
          <span className="text-xs text-neutral-400 group-hover:text-white transition-colors">→</span>
        </a>

        <a
          href="https://github.com/SHREYASH1204"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-space-950/60 border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-800/40">
              <Github size={18} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                GitHub Repositories
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                github.com/SHREYASH1204
              </div>
            </div>
          </div>
          <span className="text-xs text-neutral-400 group-hover:text-white transition-colors">→</span>
        </a>
      </div>
    </div>
  );
};
