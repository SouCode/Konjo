"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import styles from "./chatWidget.module.css";

interface Message {
  id: string;
  content: string;
  user_email: string;
  created_at: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Fetch initial messages and set up the realtime subscription
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    // Realtime subscription for new messages
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          console.log("New message received:", payload.new);
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe();

    // Cleanup the subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const user = await supabase.auth.getUser();
    const { error } = await supabase.from("messages").insert({
      content: newMessage.trim(),
      user_email: user.data.user?.email || "Anonymous",
    });

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div className={styles.chatWidget}>
      <div className={styles.chatHeader}>
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
}
