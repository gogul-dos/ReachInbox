import { useEffect, useState } from "react";
import axios from "axios";

function Onebox() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("https://api.example.com/onebox/list");
        setThreads(response.data);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      }
    };

    fetchThreads();
  }, []);

  const handleDelete = async (threadId) => {
    try {
      await axios.delete(`https://api.example.com/onebox/${threadId}`);
      setThreads(threads.filter((thread) => thread.id !== threadId));
    } catch (error) {
      console.error("Failed to delete thread:", error);
    }
  };

  const handleReply = (threadId) => {
    setSelectedThread(threadId);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://api.example.com/onebox/${selectedThread}/reply`,
        {
          message: replyText,
        }
      );
      alert("Reply sent successfully!");
      setReplyText("");
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedThread) {
        if (e.key === "d" || e.key === "D") {
          handleDelete(selectedThread);
        } else if (e.key === "r" || e.key === "R") {
          handleReply(selectedThread);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedThread]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Onebox</h1>
      <ul className="space-y-4">
        {threads.map((thread) => (
          <li
            key={thread.id}
            className={`p-4 rounded-lg shadow-md cursor-pointer transition-colors ${
              selectedThread === thread.id
                ? "bg-blue-200 dark:bg-blue-700"
                : "bg-white dark:bg-gray-800"
            }`}
            onClick={() => setSelectedThread(thread.id)}
          >
            <p className="text-lg font-semibold">{thread.subject}</p>
          </li>
        ))}
      </ul>
      {selectedThread && (
        <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-4">
            Selected Thread: {selectedThread}
          </h2>
          <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h2 className="text-xl font-semibold mb-4">
              Reply to: {selectedThread}
            </h2>
            <form onSubmit={handleReplySubmit}>
              <textarea
                className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-600 dark:border-gray-500 mb-4"
                placeholder="Write your reply..."
                rows="5"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Reply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Onebox;
