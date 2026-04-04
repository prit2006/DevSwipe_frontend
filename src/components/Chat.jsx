// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     console.log(chat.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstname: senderId?.firstname,
//         lastname: senderId?.lastname,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     // As soon as the page loaded, the socket connection is made and joinChat event is emitted
//     socket.emit("joinChat", {
//       firstname: user.firstname,
//       userId,
//       targetUserId,
//     });

//     socket.on("messageReceived", ({ firstname, lastname, text }) => {
//       console.log(firstname + " :  " + text);
//       setMessages((messages) => [...messages, { firstname, lastname, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstname: user.firstname,
//       lastname: user.lastname,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={
//                 "chat " +
//                 (user.firstname === msg.firstname ? "chat-end" : "chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstname}  ${msg.lastname}`}
//                 <time className="text-xs opacity-50"> 2 hours ago</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-gray-500 text-white rounded p-2"
//         ></input>
//         <button onClick={sendMessage} className="btn btn-secondary">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Chat;

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Mono:wght@400;500&display=swap');

  @keyframes aurora1 {
    0%   { transform: translate(0%,0%) scale(1) rotate(0deg); }
    25%  { transform: translate(8%,-12%) scale(1.15) rotate(15deg); }
    50%  { transform: translate(-6%,8%) scale(0.9) rotate(-10deg); }
    75%  { transform: translate(10%,5%) scale(1.1) rotate(20deg); }
    100% { transform: translate(0%,0%) scale(1) rotate(0deg); }
  }
  @keyframes aurora2 {
    0%   { transform: translate(0%,0%) scale(1) rotate(0deg); }
    30%  { transform: translate(-10%,10%) scale(1.2) rotate(-20deg); }
    60%  { transform: translate(12%,-8%) scale(0.85) rotate(15deg); }
    100% { transform: translate(0%,0%) scale(1) rotate(0deg); }
  }
  @keyframes aurora3 {
    0%   { transform: translate(0%,0%) scale(1); opacity:0.5; }
    50%  { transform: translate(-15%,15%) scale(1.3); opacity:0.8; }
    100% { transform: translate(0%,0%) scale(1); opacity:0.5; }
  }
  @keyframes aurora4 {
    0%   { transform: translate(0%,0%) scale(1); }
    40%  { transform: translate(18%,-10%) scale(1.25); }
    80%  { transform: translate(-8%,12%) scale(0.9); }
    100% { transform: translate(0%,0%) scale(1); }
  }
  @keyframes twinkle {
    0%,100% { opacity:0.1; transform:scale(0.8); }
    50%     { opacity:1; transform:scale(1.4); }
  }
  @keyframes particle {
    0%   { transform: translateY(100vh) translateX(0) scale(0); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:0.6; }
    100% { transform: translateY(-10vh) translateX(var(--dx)) scale(1.5); opacity:0; }
  }
  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes gradShift {
    0%,100% { background-position:0% 50%; }
    50%     { background-position:100% 50%; }
  }
  @keyframes msgPop {
    0%   { opacity:0; transform:translateY(10px) scale(0.95); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes dotWave {
    0%,100% { transform:scaleY(0.3); opacity:0.3; }
    50%     { transform:scaleY(1.4); opacity:1; }
  }

  .chat-grad-title {
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 30%, #38bdf8 60%, #818cf8 80%, #f0abfc 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s ease infinite;
  }

  .chat-msg { animation: msgPop 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

  .chat-bubble-mine {
    background: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.35));
    border: 1px solid rgba(124,58,237,0.4);
    border-bottom-right-radius: 4px !important;
  }
  .chat-bubble-theirs {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-bottom-left-radius: 4px !important;
  }

  .chat-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: 12px;
    color: rgba(255,255,255,0.85);
    padding: 12px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
  }
  .chat-input::placeholder { color: rgba(255,255,255,0.2); }
  .chat-input:focus {
    border-color: rgba(168,85,247,0.6);
    box-shadow: 0 0 20px rgba(124,58,237,0.2);
  }

  .chat-send-btn {
    padding: 12px 22px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    color: white;
    box-shadow: 0 0 20px rgba(124,58,237,0.4);
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .chat-send-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  .chat-send-btn:active { transform: scale(0.97); }

  .chat-scrollbar::-webkit-scrollbar { width: 4px; }
  .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 2px; }
`;

const AuroraBg = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 50%, #030308 100%)" }}/>
    <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"70%", height:"70%", background:"radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)", filter:"blur(60px)", animation:"aurora1 18s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", top:"10%", right:"-15%", width:"60%", height:"60%", background:"radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)", filter:"blur(80px)", animation:"aurora2 22s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"-10%", left:"20%", width:"50%", height:"50%", background:"radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(167,139,250,0.15) 50%, transparent 70%)", filter:"blur(70px)", animation:"aurora3 14s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", bottom:"20%", right:"5%", width:"40%", height:"40%", background:"radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)", filter:"blur(50px)", animation:"aurora4 26s ease-in-out infinite" }}/>
    {[...Array(40)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:i%5===0?3:i%3===0?2:1, height:i%5===0?3:i%3===0?2:1, borderRadius:"50%", background:"white", animation:`twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite` }}/>
    ))}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{ position:"absolute", left:`${5+i*7}%`, bottom:0, width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:i%2===0?`rgba(168,85,247,0.5)`:`rgba(6,182,212,0.5)`, "--dx":`${-40+Math.random()*80}px`, animation:`particle ${6+Math.random()*10}s ease-in ${Math.random()*8}s infinite` }}/>
    ))}
  </div>
);

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const bottomRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return { firstname: senderId?.firstname, lastname: senderId?.lastname, text };
    });
    setMessages(chatMessages);
  };

  useEffect(() => { fetchChatMessages(); }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstname: user.firstname, userId, targetUserId });
    socket.on("messageReceived", ({ firstname, lastname, text }) => {
      setMessages((messages) => [...messages, { firstname, lastname, text }]);
    });
    return () => { socket.disconnect(); };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstname: user.firstname,
      lastname: user.lastname,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030308", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 24px 24px" }}>
      <style>{styles}</style>
      <AuroraBg />

      {/* Chat window */}
      <div style={{
        position:"relative", zIndex:5,
        width:"100%", maxWidth:720,
        height:"calc(100vh - 120px)",
        display:"flex", flexDirection:"column",
        borderRadius:24,
        border:"1px solid rgba(124,58,237,0.25)",
        background:"rgba(255,255,255,0.025)",
        backdropFilter:"blur(40px)",
        boxShadow:"0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow:"hidden",
      }}>

        {/* shimmer top bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #ec4899, #7c3aed)", backgroundSize:"300% 100%", animation:"shimmerBorder 3s linear infinite", zIndex:2 }}/>

        {/* Header */}
        <div style={{
          padding:"18px 24px",
          borderBottom:"1px solid rgba(124,58,237,0.15)",
          display:"flex", alignItems:"center", gap:12,
          background:"rgba(255,255,255,0.02)",
        }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 10px rgba(16,185,129,0.9)", animation:"dotWave 2s ease-in-out infinite" }}/>
          <h1 className="chat-grad-title" style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900 }}>
            Chat
          </h1>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(16,185,129,0.7)", fontFamily:"'DM Mono', monospace" }}>online</span>
          </div>
        </div>

        {/* Messages */}
        <div
          className="chat-scrollbar"
          style={{ flex:1, overflowY:"auto", padding:"20px 20px 8px", display:"flex", flexDirection:"column", gap:12 }}
        >
          {messages.map((msg, index) => {
            const isMine = user.firstname === msg.firstname;
            return (
              <div
                key={index}
                className="chat-msg"
                style={{
                  display:"flex",
                  flexDirection:"column",
                  alignItems: isMine ? "flex-end" : "flex-start",
                  animationDelay:`${Math.min(index * 0.03, 0.3)}s`,
                }}
              >
                {/* Name + time */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexDirection: isMine ? "row-reverse" : "row" }}>
                  <span style={{ fontSize:10, color: isMine ? "rgba(167,139,250,0.7)" : "rgba(6,182,212,0.7)", fontFamily:"'DM Mono', monospace", letterSpacing:"0.05em" }}>
                    {msg.firstname} {msg.lastname}
                  </span>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.2)", fontFamily:"'DM Mono', monospace" }}>now</span>
                </div>

                {/* Bubble */}
                <div
                  className={isMine ? "chat-bubble-mine" : "chat-bubble-theirs"}
                  style={{
                    padding:"10px 14px",
                    borderRadius:14,
                    maxWidth:"72%",
                    fontSize:13,
                    color: isMine ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.75)",
                    fontFamily:"'DM Mono', monospace",
                    lineHeight:1.6,
                    letterSpacing:"0.02em",
                    wordBreak:"break-word",
                  }}
                >
                  {msg.text}
                </div>

                {/* Seen */}
                <span style={{ fontSize:9, color:"rgba(255,255,255,0.15)", fontFamily:"'DM Mono', monospace", marginTop:3, letterSpacing:"0.1em" }}>
                  seen
                </span>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{
          padding:"14px 16px",
          borderTop:"1px solid rgba(124,58,237,0.15)",
          display:"flex", alignItems:"center", gap:10,
          background:"rgba(255,255,255,0.015)",
        }}>
          <input
            className="chat-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send)"
          />
          <button className="chat-send-btn" onClick={sendMessage}>
            Send ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;