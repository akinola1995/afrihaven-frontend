import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'user@afrihaven.com';
  const role = localStorage.getItem('role') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  // Define all navs but show only what matches user role
  const navItemsByRole = {
    Admin: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Properties', children: [
          { label: 'Add Property', path: '/add-property' },
          { label: 'My Properties', path: '/properties' }
        ] 
      },
      { label: 'Listings', children: [
          { label: 'Rent', path: '/listings/rent' },
          { label: 'Sale', path: '/listings/sale' },
          { label: 'Short Lets', path: '/listings/shortlet' },
          { label: 'Land', path: '/listings/land' }
        ] 
      },
      { label: 'Calendar', path: '/calendar' },
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ],

    Owner: [
      { label: 'Dashboard', path: '/dashboard/owner' },
      { label: 'Properties', children: [
          { label: 'Add Property', path: '/add-property' },
          { label: 'My Properties', path: '/properties' }
        ] 
      },
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ],

    Agent: [
      { label: 'Dashboard', path: '/dashboard/agent' },
      { label: 'Properties', children: [
          { label: 'Add Property', path: '/add-property' },
          { label: 'My Properties', path: '/properties' }
        ] 
      },
      { label: 'Listings', children: [
          { label: 'Rent', path: '/listings/rent' },
          { label: 'Sale', path: '/listings/sale' }
        ] 
      },
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ],

    Tenant: [
      { label: 'Dashboard', path: '/dashboard/tenant' },
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ],

    Buyer: [
      { label: 'Dashboard', path: '/dashboard/buyer' },
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ],

    Renter: [
      { label: 'Dashboard', path: '/dashboard/renter' },
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ],

    Inquirer: [
      { label: 'Inbox', path: '/inbox' },
      { label: 'Profile', path: '/profile' }
    ]
  };

  const userNav = navItemsByRole[role] || [];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 space-y-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">AfriHaven</h2>
          <nav className="space-y-4">
            {userNav.map((section, i) => (
              <div key={i}>
                {section.path ? (
                  <Link
                    to={section.path}
                    className={`block px-4 py-2 rounded text-sm font-medium ${
                      location.pathname.startsWith(section.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                  </Link>
                ) : (
                  <div>
                    <p className="text-xs text-gray-500 mb-2 px-2 uppercase tracking-wide">{section.label}</p>
                    <div className="pl-2 space-y-1">
                      {section.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-3 py-1 rounded text-sm font-medium ${
                            location.pathname.startsWith(child.path)
                              ? 'bg-blue-100 text-blue-800'
                              : 'text-gray-700 hover:bg-blue-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content + Header */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-3">
          <div>
            <h1 className="text-sm text-gray-600">Logged in as <strong>{role}</strong></h1>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${role}&background=0D8ABC&color=fff`}
              alt="User"
              className="w-10 h-10 rounded-full shadow"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
