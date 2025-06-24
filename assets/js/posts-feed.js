/**
 * Posts Feed - Fetches and displays blog posts from JSON feed
 */
document.addEventListener('DOMContentLoaded', function() {
  const postsContainer = document.getElementById('posts-feed');

  // Only proceed if we're on a page with the posts container
  if (!postsContainer) return;

  // Fetch the JSON feed
  // Get the URL from the link tag in the head
  const jsonFeedLink = document.querySelector('link[type="application/json"]');
  // If we can't find the link tag, construct the URL based on the current page
  const jsonFeedUrl = jsonFeedLink ? jsonFeedLink.href : window.location.origin + '/index.json';

  fetch(jsonFeedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      if (!Array.isArray(posts) || posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts found.</p>';
        return;
      }

      // Sort posts by date (newest first)
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Display the posts
      const postsHTML = posts.map(post => `
        <article class="post-card">
          ${post.image ? `<div class="post-card-image">
            <a href="${post.permalink}">
              <img src="${post.image}" alt="${post.title}" loading="lazy">
            </a>
          </div>` : ''}
          <div class="post-card-content">
            <header class="post-card-header">
              ${post.tags && post.tags.length > 0 ? `
                <div class="post-card-tags">
                  ${post.tags.map(tag => `<span class="post-card-tag">${tag}</span>`).join('')}
                </div>
              ` : ''}
              <h2 class="post-card-title">
                <a href="${post.permalink}">${post.title}</a>
              </h2>
            </header>
            <div class="post-card-meta">
              <span class="post-card-date">${post.date}</span>
              <span class="post-card-reading-time">${post.readingTime} min read</span>
            </div>
            <div class="post-card-excerpt">
              <p>${post.summary}</p>
            </div>
            <footer class="post-card-footer">
              <a href="${post.permalink}" class="post-card-read-more">Read More →</a>
            </footer>
          </div>
        </article>
      `).join('');

      postsContainer.innerHTML = postsHTML;
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
    });
});
