import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Future of Web Development in 2023",
      author: "John Doe",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      excerpt: "Exploring the latest trends and technologies that are shaping the future of web development and how developers can stay ahead.",
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
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Dive deep into advanced JavaScript concepts that will take your coding skills to the next level.",
      tags: ["JavaScript", "Programming", "Web Dev"],
      comments: [
        { id: 1, author: "Mike Chen", text: "Very helpful for beginners!", date: "3 days ago" }
      ]
    }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
  const [newComment, setNewComment] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      username: formData.get('username'),
      email: formData.get('email')
    };
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    const user = { username: 'Demo User', email };
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      tags: newPost.tags,
      author: currentUser.username,
      date: "Just now",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      excerpt: newPost.content.substring(0, 150) + "...",
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', tags: [] });
  };

  const addComment = (postId) => {
    if (!newComment.trim()) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              author: currentUser.username,
              text: newComment,
              date: "Just now"
            }
          ]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setNewComment('');
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, e.target.value.trim()]
      });
      e.target.value = '';
    }
  };

  const removeTag = (indexToRemove) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleEditorInput = (content) => {
    setNewPost({ ...newPost, content });
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const Header = () => (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-blog"></i>
            <span>BlogNewq</span>
          </div>
          <nav>
            <ul>
              <li><button className="nav-link"><i className="fas fa-home"></i> Home</button></li>
              <li><button className="nav-link"><i className="fas fa-pen"></i> Write</button></li>
              <li><button className="nav-link"><i className="fas fa-tags"></i> Categories</button></li>
              <li><button className="nav-link"><i className="fas fa-users"></i> Community</button></li>
              <li><button className="nav-link"><i className="fas fa-info-circle"></i> About</button></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            {currentUser ? (
              <>
                <span>Welcome, {currentUser.username}</span>
                <button className="btn btn-outline" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => {
                  setShowAuthModal(true);
                  setIsLoginMode(true);
                }}>
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>
                <button className="btn btn-primary" onClick={() => {
                  setShowAuthModal(true);
                  setIsLoginMode(false);
                }}>
                  <i className="fas fa-user-plus"></i> Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const HeroSection = () => (
    <section className="hero">
      <div className="container">
        <h1>Share Your Stories With The World</h1>
        <p>BlogNewq is the modern platform for writers and readers to connect, share ideas, and explore new perspectives.</p>
        <div className="hero-buttons">
          <button className="btn btn-primary">
            <i className="fas fa-pen-fancy"></i> Start Writing
          </button>
          <button className="btn btn-outline">
            <i className="fas fa-book-reader"></i> Explore Blogs
          </button>
        </div>
      </div>
    </section>
  );

  const PostCard = ({ post }) => (
    <div className="post-card">
      <div className="post-image" style={{backgroundImage: `url(${post.image})`}}></div>
      <div className="post-content">
        <div className="post-meta">
          <div className="post-author">
            <i className="fas fa-user"></i> {post.author}
          </div>
          <div className="post-date">
            <i className="far fa-clock"></i> {post.date}
          </div>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        <button className="read-more">Read More <i className="fas fa-arrow-right"></i></button>

        <div className="comments-section">
          <h3>Comments ({post.comments.length})</h3>
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">{comment.author.charAt(0)}</div>
              <div className="comment-content">
                <h4>{comment.author} <span className="comment-date">{comment.date}</span></h4>
                <div className="comment-text">{comment.text}</div>
              </div>
            </div>
          ))}
          {currentUser && (
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
              />
              <button onClick={() => addComment(post.id)}>Post</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const PostEditor = () => (
    <div className="editor-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          required
        />
        
        <div className="tags-input">
          <div className="tags-container">
            {newPost.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
                <button type="button" onClick={() => removeTag(index)}>×</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tags (press Enter)"
            onKeyDown={handleTagInput}
          />
        </div>

        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button type="button" onClick={() => formatText('bold')}>
              <i className="fas fa-bold"></i>
            </button>
            <button type="button" onClick={() => formatText('italic')}>
              <i className="fas fa-italic"></i>
            </button>
            <button type="button" onClick={() => formatText('underline')}>
              <i className="fas fa-underline"></i>
            </button>
          </div>
          <div className="toolbar-group">
            <button type="button" onClick={() => formatText('formatBlock', '<h2>')}>
              <i className="fas fa-heading"></i>
            </button>
            <button type="button" onClick={() => formatText('formatBlock', '<blockquote>')}>
              <i className="fas fa-quote-right"></i>
            </button>
            <button type="button" onClick={() => formatText('formatBlock', '<pre>')}>
              <i className="fas fa-code"></i>
            </button>
          </div>
        </div>

        <div
          className="editor-content"
          contentEditable
          onInput={(e) => handleEditorInput(e.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: newPost.content || 'Start writing your post here...' }}
        />

        <button type="submit" className="btn btn-primary">Publish Post</button>
      </form>
    </div>
  );

  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-widget">
        <h3 className="widget-title">About BlogNewq</h3>
        <p>BlogNewq is a modern blogging platform that empowers writers to share their stories and connect with readers worldwide.</p>
        <div className="social-links">
          <button><i className="fab fa-facebook-f"></i></button>
          <button><i className="fab fa-twitter"></i></button>
          <button><i className="fab fa-instagram"></i></button>
          <button><i className="fab fa-linkedin-in"></i></button>
        </div>
      </div>

      <div className="sidebar-widget">
        <h3 className="widget-title">Popular Posts</h3>
        <div className="popular-posts">
          <div className="popular-post">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Popular Post" />
            <div className="popular-post-content">
              <h4>10 Tips for Better Coding</h4>
              <div className="post-meta">
                <span><i className="far fa-eye"></i> 2.5k views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-widget">
        <h3 className="widget-title">Categories</h3>
        <div className="categories">
          <div className="category">
            <span>Technology</span>
            <span>28</span>
          </div>
          <div className="category">
            <span>Programming</span>
            <span>42</span>
          </div>
        </div>
      </div>

      <div className="sidebar-widget">
        <h3 className="widget-title">Popular Tags</h3>
        <div className="tag-cloud">
          <span className="tag">JavaScript</span>
          <span className="tag">React</span>
          <span className="tag">Web Development</span>
          <span className="tag">CSS</span>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>BlogNewq</h3>
            <p>A modern blogging platform for writers and readers to connect and share ideas.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><button className="footer-link"><i className="fas fa-chevron-right"></i> Home</button></li>
              <li><button className="footer-link"><i className="fas fa-chevron-right"></i> About</button></li>
              <li><button className="footer-link"><i className="fas fa-chevron-right"></i> Blog</button></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><button className="footer-link"><i className="fas fa-chevron-right"></i> Technology</button></li>
              <li><button className="footer-link"><i className="fas fa-chevron-right"></i> Programming</button></li>
              <li><button className="footer-link"><i className="fas fa-chevron-right"></i> Design</button></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2023 BlogNewq. All rights reserved.
        </div>
      </div>
    </footer>
  );

  const AuthModal = () => (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isLoginMode ? 'Login to BlogNewq' : 'Join BlogNewq'}</h2>
          <span className="close-modal" onClick={() => setShowAuthModal(false)}>&times;</span>
        </div>
        <div className="modal-body">
          <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
            {!isLoginMode && (
              <div className="form-group">
                <input type="text" name="username" placeholder="Username" required />
              </div>
            )}
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" required />
            </div>
            {!isLoginMode && (
              <div className="form-group">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {isLoginMode ? 'Login' : 'Register'}
            </button>
          </form>
          <div className="auth-switch">
            <span>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button onClick={() => setIsLoginMode(!isLoginMode)} className="auth-switch-btn">
              {isLoginMode ? 'Register now' : 'Login now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <Header />
      <HeroSection />
      
      <div className="container">
        <div className="main-content">
          <div className="blog-section">
            <h2>Featured Posts</h2>
            <div className="blog-posts">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {currentUser && <PostEditor />}
          </div>

          <Sidebar />
        </div>
      </div>

      <Footer />

      {showAuthModal && <AuthModal />}
    </div>
  );
};

export default App;
