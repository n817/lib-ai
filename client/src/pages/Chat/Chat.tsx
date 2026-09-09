import { useState, useEffect, useRef } from "react";

import "./Chat.css";

import { getChats, createChat, type Chat as ChatType } from "../../utils/api";

export default function Chat() {
  // Chat state variables
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChat] = useState<boolean>(true);
  const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false);
  const [newChatTitle, setNewChatTitle] = useState<string>("");

  // Load existing chats
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getChats(); // call getChats and await the result
        setChats(res.data || []); // save res.data in chats, or use an empty array if res.data is missing (falsy)
      } catch {
        setChatsError("Failed to load chats..."); // save an error message in chatsError
      } finally {
        setIsLoadingChat(false); // set isLoadingChats to false
      }
    };

    load();
  }, []);

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || "New Chat";
    // Set isCreatingChat and newChatTitle back to default values
    setIsCreatingChat(false);
    setNewChatTitle("");
    try {
      const res = await createChat(title);
      if (res.data) {
        // Prepend the new chat and select it
        setChats((prev) => [res.data!, ...prev]);
        setActiveChatId(res.data._id);
      }
    } catch {}
  };

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <button
          className="chat__new-button"
          type="button"
          onClick={() => setIsCreatingChat(true)}
        >
          New Chat
        </button>

        {isCreatingChat && (
          <input
            className="chat__title-input"
            type="text"
            placeholder="Chat name"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateChat();
              if (e.key === "Escape") {
                setIsCreatingChat(false);
                setNewChatTitle("");
              }
            }}
            autoFocus
          />
        )}

        {isLoadingChats && <p className="chat__sidebar-message">Loading…</p>}
        {chatsError && <p className="chat__sidebar-message">{chatsError}</p>}

        <ul className="chat__list">
          {chats.map((c) => (
            <li
              key={c._id}
              className={
                c._id === activeChatId
                  ? "chat__list-item chat__list-item_active"
                  : "chat__list-item"
              }
              onClick={() => {
                setActiveChatId(c._id);
                setIsMobileMenuOpen(false);
              }}
            >
              {c.title}
            </li>
          ))}
        </ul>
      </aside>

      <div className="chat__main"></div>
    </div>
  );
}
