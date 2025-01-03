"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import styles from "./chatWidget.module.css";

interface Message {
  id: string;
  content: string;
  user_email: string;
  created_at: string;
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) {
        setMessages(data || []);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const user = await supabase.auth.getUser();
    const { error } = await supabase.from("messages").insert({
      content: newMessage.trim(),
      user_email: user.data.user?.email || "Anonymous",
    });

    if (!error) {
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatWidget}>
      <div className={`${styles.chatHeader} drag-handle`}>
        <span>Community Chat</span>
        <button className={styles.closeButton}>✕</button>
    </div>

      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div key={message.id} className={styles.chatMessage}>
            <span className={styles.messageEmail}>{message.user_email}</span>
            <span className={styles.messageContent}>{message.content}</span>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Send a message"
          className={styles.inputField}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
