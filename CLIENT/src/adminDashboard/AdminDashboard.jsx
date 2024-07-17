import React, { useState , useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Services from './Services';
import HomeDashboard from './HomeDashboard';
import Messages from './Messages';
import Requests from './Requests';
import CreateBlogForm from './CreateBlogForm';
import ProfileForm from './ProfileForm';
import HistoriqueDeServiceTable from './HistoriqueDeServiceTable'; // Adjust import as needed based on your file structure
import { useAuth } from '../components/AuthContext'; // Import useAuth hook

function AdminDashboard() {
  const [content, setContent] = useState(); // Assuming content will be dynamic
  const [searchTerm, setSearchTerm] = useState('');
  const { role } = useAuth(); // Access role using useAuth hook

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Searching for:', term);
  };

  // Set content based on user role
  const setInitialContent = () => {
    if (role === 'client') {
      setContent(5); // Set content to 5 for client role
    } else {
      setContent(0); // Set content to 3 for other roles
    }
  };

  // Initialize content on component mount
  useEffect(() => {
    setInitialContent();
  }, []); // Empty dependency array ensures this effect runs only on mount

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setcontent={setContent} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar onSearch={handleSearch} setContent={setContent} content={content} />
        <div className="p-4 flex-1 overflow-y-auto">
          {content === 0 && <HomeDashboard />}
          {content === 2 && (
            <div className="text-center">
              <ProfileForm />
            </div>
          )}
          {content === 1 && (
            <div className="text-center">
              <Services />
            </div>
          )}
          {content === 3 && (
            <div className="text-center">
              <Requests />
            </div>
          )}
          {content === 4 && (
            <div className="text-center">
              <CreateBlogForm />
            </div>
          )}
          {content === 6 && (
            <div className="text-center">
              <Messages />
            </div>
          )}
          {content === 5 && (
            <div className="text-center">
              <HistoriqueDeServiceTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
