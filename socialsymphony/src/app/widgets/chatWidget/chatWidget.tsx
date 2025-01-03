"use client";

import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core"; // Import useDraggable from dnd-kit
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

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "chatWidget",
  });

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

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage("");
    }
  };

  // Apply transformation from drag events
  const transformStyle = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef} // Set node ref for draggable functionality
      {...attributes} // Attach draggable attributes
      {...listeners} // Attach drag listeners
      className={styles.chatWidget}
      style={transformStyle} // Apply transform for drag effect
    >
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
