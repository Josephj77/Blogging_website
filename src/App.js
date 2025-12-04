// React aur required libraries import karna
import React, { useState, useEffect } from 'react';
import './App.css';

// Main App component
const App = () => {
  // State variables define karna (variables jo change hote hain)
  const [currentUser, setCurrentUser] = useState(null); // Current logged in user
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth modal show/hide
  const [isLoginMode, setIsLoginMode] = useState(true); // Login ya Register mode
  const [authError, setAuthError] = useState(''); // Authentication errors
  const [posts, setPosts] = useState([ // Blog posts ka array
    {
      id: 1,
      title: "The Future of Web Development in 2023",
      author: "John Doe",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80",
      excerpt: "Exploring the latest trends and technologies that are shaping the future of web development.",
      fullContent: "Exploring the latest trends and technologies that are shaping the future of web development and how developers can stay ahead. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["Technology", "Web Dev", "Trends"],
      comments: [
        { id: 1, author: "John Doe", text: "This is a fantastic article!", date: "2 days ago" },
        { id: 2, author: "Sarah Johnson", text: "Great insights!", date: "5 days ago" }
      ]
    },
    {
      id: 2,
      title: "Mastering JavaScript: Advanced Concepts",
      author: "Sarah Johnson",
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Dive deep into advanced JavaScript concepts that will take your coding skills to the next level.",
      fullContent: "Dive deep into advanced JavaScript concepts that will take your coding skills to the next level. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["JavaScript", "Programming", "Web Dev"],
      comments: [
        { id: 1, author: "Mike Chen", text: "Very helpful for beginners!", date: "3 days ago" }
      ]
    }
  ]);
  
  // New post ka state (naya post create karne ke liye)
  const [newPost, setNewPost] = useState({ 
    title: '', // Post title
    content: '', // Post content
    tags: [] // Post tags
  });
  
  const [commentInput, setCommentInput] = useState(''); // Comment input field
  const [currentPage, setCurrentPage] = useState('home'); // Current page (home, categories, etc.)
  const [selectedPost, setSelectedPost] = useState(null); // Selected post for detailed view
  const [showWriteModal, setShowWriteModal] = useState(false); // Write post modal show/hide
  const [registeredUsers, setRegisteredUsers] = useState([]); // Registered users list
  const [notification, setNotification] = useState(''); // Notification messages

  // SECRET ADMIN CREDENTIALS - Sirf admin ko pata hoga
  const ADMIN_CREDENTIALS = {
    email: "warsenakii@gmail.com", // Admin ka secret email
    username: "Paistakarr", // Admin ka username
    password: "ashw8433" // Admin ka secret password
  };

  // Component load hone par localStorage se users load karna
  useEffect(() => {
    const savedUsers = localStorage.getItem('blogUsers'); // localStorage se users nikalna
    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers); // JSON string ko object mein convert karna
        setRegisteredUsers(users); // Users ko state mein set karna
      } catch (error) {
        console.error('Error loading users:', error); // Error handle karna
      }
    }
  }, []); // Empty dependency array - sirf ek baar chalega

  // Notification message show karne ka function
  const showMessage = (message) => {
    setNotification(message); // Message set karna
    setTimeout(() => setNotification(''), 3000); // 3 seconds baad message hide karna
  };

  // Check karna ki current user admin hai ya nahi
  const isAdmin = () => {
    return currentUser && currentUser.email === ADMIN_CREDENTIALS.email;
  };

  // User registration handle karna
  const handleRegister = (e) => {
    e.preventDefault(); // Form submit default behavior rokna
    const form = e.target; // Form element
    const username = form.username.value.trim(); // Username get karna
    const email = form.email.value.trim(); // Email get karna
    const password = form.password.value; // Password get karna
    const confirmPassword = form.confirmPassword.value; // Confirm password get karna

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setAuthError("All fields are required!"); // Saare fields required hain
      return;
    }

    if (password !== confirmPassword) {
      setAuthError("Passwords don't match!"); // Passwords match nahi hote
      return;
    }

    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters!"); // Password minimum 6 characters
      return;
    }

    // Admin email se register hone se rokna
    if (email === ADMIN_CREDENTIALS.email) {
      setAuthError("This email cannot be used for registration");
      return;
    }

    // Check karna ki user pehle se registered hai ya nahi
    const existingUser = registeredUsers.find(user => 
      user.email.toLowerCase() === email.toLowerCase() // Email case-insensitive check
    );

    if (existingUser) {
      setAuthError("User with this email already exists!"); // User already exists
      return;
    }

    // Naya user create karna
    const newUser = { 
      id: Date.now(), // Unique ID ke liye timestamp use karna
      username, 
      email, 
      password,
      isAdmin: false // Regular users admin nahi hote
    };

    // Users list update karna aur localStorage mein save karna
    const updatedUsers = [...registeredUsers, newUser]; // Naya user add karna
    setRegisteredUsers(updatedUsers); // State update karna
    localStorage.setItem('blogUsers', JSON.stringify(updatedUsers)); // localStorage mein save karna
    
    // Current user set karna
    setCurrentUser(newUser);
    setShowAuthModal(false); // Modal band karna
    setAuthError(''); // Errors clear karna
    showMessage(`Welcome ${username}! Registration successful.`); // Success message
  };

  // User login handle karna
  const handleLogin = (e) => {
    e.preventDefault(); // Form submit default behavior rokna
    const form = e.target; // Form element
    const email = form.email.value.trim(); // Email get karna
    const password = form.password.value; // Password get karna

    // Pehle check karna ki admin login hai ya nahi
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Admin login successful
      const adminUser = {
        id: 0, // Admin ID
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email,
        isAdmin: true // Admin flag set karna
      };
      
      setCurrentUser(adminUser); // Current user admin set karna
      setShowAuthModal(false); // Modal band karna
      setAuthError(''); // Errors clear karna
      showMessage(`Welcome Admin! Admin panel loaded.`); // Admin welcome message
      return;
    }

    // Regular user login
    // Check karna ki koi users registered hain ya nahi
    if (registeredUsers.length === 0) {
      setAuthError("No users registered yet. Please register first!");
      return;
    }

    // Email se user find karna
    const user = registeredUsers.find(user => 
      user.email.toLowerCase() === email.toLowerCase() // Case-insensitive search
    );

    // Check karna ki user exists hai ya nahi
    if (!user) {
      setAuthError("User not found. Please register first!");
      return;
    }

    // Password check karna
    if (user.password !== password) {
      setAuthError("Incorrect password!");
      return;
    }

    // Success - user login karna
    setCurrentUser(user);
    setShowAuthModal(false);
    setAuthError('');
    showMessage(`Welcome back ${user.username}!`);
  };

  // Logout handle karna
  const handleLogout = () => {
    setCurrentUser(null); // Current user null karna
    showMessage('Logged out successfully!'); // Logout message
  };

  // Naya post create karna
  const handleCreatePost = (e) => {
    e.preventDefault(); // Form submit default behavior rokna
    
    if (!currentUser) {
      showMessage('Please login first!'); // Login required message
      setShowAuthModal(true); // Auth modal show karna
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      showMessage('Please fill in all fields!'); // Validation message
      return;
    }

    const post = {
      id: Date.now(), // Unique ID ke liye timestamp
      title: newPost.title,
      content: newPost.content,
      fullContent: newPost.content + " [Full article content continues here...]",
      tags: newPost.tags,
      author: currentUser.username,
      date: "Just now",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      excerpt: newPost.content.substring(0, 100) + "...",
      comments: []
    };
    
    setPosts([post, ...posts]); // Naya post add karna starting mein
    setNewPost({ title: '', content: '', tags: [] }); // Form reset karna
    setShowWriteModal(false); // Modal band karna
    showMessage('Post published successfully!'); // Success message
  };

  // Post par comment add karna
  const addComment = (postId) => {
    if (!currentUser) {
      showMessage('Please login to comment!'); // Login required message
      setShowAuthModal(true); // Auth modal show karna
      return;
    }
    
    if (!commentInput.trim()) {
      showMessage('Please enter a comment!'); // Empty comment validation
      return;
    }
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(), // Unique comment ID
          author: currentUser.username,
          text: commentInput,
          date: "Just now"
        };
        return { 
          ...post, 
          comments: [...post.comments, newComment] // Naya comment add karna
        };
      }
      return post;
    });
    
    setPosts(updatedPosts); // Posts update karna
    setCommentInput(''); // Comment input clear karna
    showMessage('Comment added successfully!'); // Success message
  };

  // New post ke liye tag add karna
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault(); // Default enter behavior rokna
      const newTag = e.target.value.trim(); // Tag value get karna
      if (!newPost.tags.includes(newTag)) { // Duplicate tags check karna
        setNewPost({
          ...newPost,
          tags: [...newPost.tags, newTag] // Naya tag add karna
        });
      }
      e.target.value = ''; // Input field clear karna
    }
  };

  // Tag remove karna
  const removeTag = (indexToRemove) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter((_, index) => index !== indexToRemove) // Selected tag filter karna
    });
  };

  // Editor content update karna
  const handleEditorInput = (content) => {
    setNewPost({ ...newPost, content }); // Post content update karna
  };

  // "Read More" click karne par single post view dikhana
  const handleReadMore = (post) => {
    setSelectedPost(post); // Selected post set karna
    setCurrentPage('post'); // Page change karna
  };

  // Header Component
  const Header = () => (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            <i className="fas fa-blog"></i>
            <span>WriteZone {isAdmin() ? "(Admin)" : ""}</span> {/* Admin hone par "(Admin)" show karna */}
          </div>
          <nav>
            <ul>
              <li><button onClick={() => setCurrentPage('home')} className="nav-link">Home</button></li>
              <li><button onClick={() => {
                if (!currentUser) {
                  showMessage('Please login to write a post!');
                  setShowAuthModal(true);
                } else {
                  setShowWriteModal(true);
                }
              }} className="nav-link">Write</button></li>
              <li><button onClick={() => setCurrentPage('categories')} className="nav-link">Categories</button></li>
              <li><button onClick={() => setCurrentPage('community')} className="nav-link">Community</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="nav-link">About</button></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            {currentUser ? (
              <>
                <span>Hi, {currentUser.username} {isAdmin() ? "👑" : ""}</span> {/* Admin hone par crown emoji */}
                <button onClick={handleLogout} className="btn logout-btn">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => {
                  setShowAuthModal(true);
                  setIsLoginMode(true);
                  setAuthError('');
                }} className="btn login-btn">Login</button>
                <button onClick={() => {
                  setShowAuthModal(true);
                  setIsLoginMode(false);
                  setAuthError('');
                }} className="btn register-btn">Register</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  // Hero Section
  const HeroSection = () => (
    <section className="hero">
      <div className="container">
        <h1>Share Your Stories</h1>
        <p>A simple platform for writers and readers to connect.</p>
        <div className="hero-buttons">
          <button onClick={() => {
            if (!currentUser) {
              showMessage('Please login to write!');
              setShowAuthModal(true);
            } else {
              setShowWriteModal(true);
            }
          }} className="btn hero-btn">Start Writing</button>
          <button onClick={() => setCurrentPage('explore')} className="btn hero-btn-outline">Explore Blogs</button>
        </div>
      </div>
    </section>
  );

  // Post Card Component (Har post ke liye)
  const PostCard = ({ post }) => {
    const [commentText, setCommentText] = useState(''); // Post-specific comment
    
    const handleCommentSubmit = () => {
      if (!commentText.trim()) return; // Empty comment check
      
      if (!currentUser) {
        showMessage('Please login to comment!');
        setShowAuthModal(true);
        return;
      }
      
      const updatedPosts = posts.map(p => {
        if (p.id === post.id) {
          const newComment = {
            id: Date.now(),
            author: currentUser.username,
            text: commentText,
            date: "Just now"
          };
          return { 
            ...p, 
            comments: [...p.comments, newComment] 
          };
        }
        return p;
      });
      
      setPosts(updatedPosts);
      setCommentText('');
      showMessage('Comment added!');
    };
    
    return (
      <div className="post-card">
        <div className="post-image" style={{backgroundImage: `url(${post.image})`}}></div>
        <div className="post-content">
          <div className="post-meta">
            <span><i className="fas fa-user"></i> {post.author}</span>
            <span><i className="far fa-clock"></i> {post.date}</span>
          </div>
          <h3>{post.title}</h3>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-tags">
            {post.tags.map((tag, i) => (
              <span key={i} className="tag" onClick={() => showMessage(`Searching for ${tag} posts`)}>
                #{tag}
              </span>
            ))}
          </div>
          <button onClick={() => handleReadMore(post)} className="read-more-btn">
            Read More <i className="fas fa-arrow-right"></i>
          </button>

          <div className="comments-section">
            <h4>Comments ({post.comments.length})</h4>
            {post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-date">{comment.date}</div>
              </div>
            ))}
            {currentUser && (
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                />
                <button onClick={handleCommentSubmit}>Post</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Single Post View (Full post dikhane ke liye)
  const SinglePostView = () => {
    const [commentText, setCommentText] = useState('');
    
    const handleCommentSubmit = () => {
      if (!commentText.trim()) {
        showMessage('Please enter a comment!');
        return;
      }
      
      if (!currentUser) {
        showMessage('Please login to comment!');
        setShowAuthModal(true);
        return;
      }
      
      const updatedPosts = posts.map(post => {
        if (post.id === selectedPost.id) {
          const newComment = {
            id: Date.now(),
            author: currentUser.username,
            text: commentText,
            date: "Just now"
          };
          return { 
            ...post, 
            comments: [...post.comments, newComment] 
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      setSelectedPost(updatedPosts.find(p => p.id === selectedPost.id));
      setCommentText('');
      showMessage('Comment added successfully!');
    };
    
    return (
      <div className="single-post">
        <button onClick={() => setCurrentPage('home')} className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
        <div className="post-header">
          <h1>{selectedPost.title}</h1>
          <div className="post-meta">
            <span><i className="fas fa-user"></i> {selectedPost.author}</span>
            <span><i className="far fa-clock"></i> {selectedPost.date}</span>
          </div>
          <div className="post-tags">
            {selectedPost.tags.map((tag, i) => (
              <span key={i} className="tag">#{tag}</span>
            ))}
          </div>
        </div>
        <img src={selectedPost.image} alt={selectedPost.title} className="post-image-full" />
        <div className="post-content-full">
          <p>{selectedPost.fullContent}</p>
        </div>
        <div className="comments-section">
          <h3>Comments ({selectedPost.comments.length})</h3>
          {selectedPost.comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-author">{comment.author}</div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-date">{comment.date}</div>
            </div>
          ))}
          {currentUser ? (
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <button onClick={handleCommentSubmit}>Post Comment</button>
            </div>
          ) : (
            <div className="add-comment">
              <button 
                onClick={() => {
                  showMessage('Please login to comment!');
                  setShowAuthModal(true);
                }}
                style={{width: '100%'}}
              >
                Login to Comment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Categories Page
  const CategoriesPage = () => (
    <div className="page">
      <h2>Categories</h2>
      <p>Browse posts by category</p>
      <div className="categories-list">
        {['Technology', 'Programming', 'Design', 'Lifestyle', 'Business', 'Health'].map(cat => (
          <div key={cat} className="category-item" onClick={() => showMessage(`Showing ${cat} posts`)}>
            <h3>{cat}</h3>
            <p>{posts.filter(p => p.tags.includes(cat)).length} posts</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Community Page
  const CommunityPage = () => (
    <div className="page">
      <h2>Community</h2>
      <p>Join our community of {registeredUsers.length} writers and readers!</p>
      <div className="stats">
        <div className="stat-box">
          <h3>{posts.length}</h3>
          <p>Total Posts</p>
        </div>
        <div className="stat-box">
          <h3>{registeredUsers.length}</h3>
          <p>Registered Users</p>
        </div>
        <div className="stat-box">
          <h3>{posts.reduce((total, post) => total + post.comments.length, 0)}</h3>
          <p>Total Comments</p>
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className="page">
      <h2>About WriteZone</h2>
      <p>A simple blogging platform where writers can share stories and readers can discover new content.</p>
      <div className="features">
        <div className="feature">
          <i className="fas fa-pen"></i>
          <h4>Easy Writing</h4>
          <p>Simple editor for all your writing needs</p>
        </div>
        <div className="feature">
          <i className="fas fa-users"></i>
          <h4>Community</h4>
          <p>Connect with like-minded people</p>
        </div>
        <div className="feature">
          <i className="fas fa-globe"></i>
          <h4>Global Reach</h4>
          <p>Share your stories with the world</p>
        </div>
      </div>
    </div>
  );

  // Post Editor Modal (Naya post create karne ke liye)
  const PostEditorModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Create New Post</h3>
          <button 
            type="button" 
            onClick={() => setShowWriteModal(false)} 
            className="close-btn"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleCreatePost} className="modal-form">
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            required
          />
          
          <div className="tags-input">
            <div className="tags">
              {newPost.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(i)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add tags (press Enter)"
              onKeyDown={handleTagInput}
            />
          </div>

          <textarea
            className="editor-textarea"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            placeholder="Write your post here..."
            rows="10"
            required
          />

          <button type="submit" className="submit-btn">Publish Post</button>
        </form>
      </div>
    </div>
  );

  // Auth Modal (Login/Register ke liye)
  const AuthModal = () => {
    const handleSubmit = (e) => {
      if (isLoginMode) {
        handleLogin(e);
      } else {
        handleRegister(e);
      }
    };
    
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3>{isLoginMode ? 'Login' : 'Register'}</h3>
            <button 
              type="button" 
              onClick={() => setShowAuthModal(false)} 
              className="close-btn"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            {authError && <div className="error-message">{authError}</div>}
            <form onSubmit={handleSubmit}>
              {!isLoginMode && (
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username" 
                  required 
                  autoComplete="username"
                />
              )}
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
                autoComplete="email"
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                required 
                autoComplete={isLoginMode ? "current-password" : "new-password"}
              />
              {!isLoginMode && (
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                  required 
                  autoComplete="new-password"
                />
              )}
              <button type="submit" className="submit-btn">
                {isLoginMode ? 'Login' : 'Register'}
              </button>
            </form>
            <div className="auth-switch">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setAuthError('');
                }} 
                className="switch-btn"
              >
                {isLoginMode ? 'Register' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar (Right side mein content)
  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-section">
        <h4>About WriteZone</h4>
        <p>A platform for sharing stories and ideas.</p>
      </div>

      <div className="sidebar-section">
        <h4>Popular Posts</h4>
        {posts.slice(0, 2).map(post => (
          <div key={post.id} className="sidebar-post" onClick={() => handleReadMore(post)}>
            <img src={post.image} alt={post.title} />
            <div>
              <h5>{post.title}</h5>
              <small>By {post.author}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h4>Categories</h4>
        <div className="sidebar-categories">
          {['Technology', 'Programming', 'Design', 'Lifestyle'].map(cat => (
            <div key={cat} className="sidebar-category" onClick={() => showMessage(`Showing ${cat} posts`)}>
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>WriteZone</h4>
            <p>Share your stories with the world.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <button onClick={() => setCurrentPage('home')}>Home</button>
            <button onClick={() => setCurrentPage('about')}>About</button>
            <button onClick={() => setCurrentPage('explore')}>Blog</button>
          </div>
        </div>
        <div className="copyright">
          WriteZone Mini project
        </div>
      </div>
    </footer>
  );

  // Main content render karna based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'post':
        return selectedPost ? <SinglePostView /> : <div>Post not found</div>;
      case 'categories':
        return <CategoriesPage />;
      case 'community':
        return <CommunityPage />;
      case 'about':
        return <AboutPage />;
      case 'explore':
        return (
          <div className="main-content">
            <h2>All Posts</h2>
            <div className="posts-grid">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        );
      default:
        return (
          <div className="main-content">
            <h2>Recent Posts</h2>
            <div className="posts-grid">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        );
    }
  };

  // Main App return statement
  return (
    <div className="app">
      <Header /> {/* Header component */}
      {currentPage === 'home' && <HeroSection />} {/* Hero section sirf home page par */}
      
      <main className="container main-container">
        <div className="content-wrapper">
          {renderContent()} {/* Current page ka content */}
          {currentPage === 'home' && <Sidebar />} {/* Sidebar sirf home page par */}
        </div>
      </main>

      <Footer /> {/* Footer component */}

      {showAuthModal && <AuthModal />} {/* Auth modal conditionally show */}
      {showWriteModal && <PostEditorModal />} {/* Write modal conditionally show */}
      
      {notification && ( // Notification conditionally show
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default App; // App component export karna
