import React from 'react';

const messages = [
  { id: 1, content: "Message 1", status: "viewed" },
  { id: 2, content: "Message 2", status: "not_viewed" },
  { id: 3, content: "Message 3", status: "viewed_no_response" },
  // Add more messages as needed
];

const getStatusStyle = (status) => {
  switch (status) {
    case "viewed":
      return "bg-green-100 text-green-800";
    case "not_viewed":
      return "bg-red-100 text-red-800";
    case "viewed_no_response":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "";
  }
};

const MessageTable = ({ title, messages }) => (
  <div className="my-4">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Content</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className={getStatusStyle(message.status)}>
              <td className="py-2 px-4 border-b">{message.id}</td>
              <td className="py-2 px-4 border-b">{message.content}</td>
              <td className="py-2 px-4 border-b capitalize">{message.status.replace('_', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MessagesTables = () => {
  const viewedMessages = messages.filter(msg => msg.status === "viewed");
  const notViewedMessages = messages.filter(msg => msg.status === "not_viewed");
  const viewedNoResponseMessages = messages.filter(msg => msg.status === "viewed_no_response");

  return (
    <div>
      <MessageTable title="Viewed Messages" messages={viewedMessages} />
      <MessageTable title="Not Viewed Messages" messages={notViewedMessages} />
      <MessageTable title="Viewed but No Response Messages" messages={viewedNoResponseMessages} />
    </div>
  );
};

export default MessagesTables;
