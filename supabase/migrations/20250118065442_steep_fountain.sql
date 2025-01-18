/*
  # Seed test data

  1. Test Data
    - Create test user profile
    - Add sample blog posts
    - Add sample comments

  2. Notes
    - All data is for testing purposes
    - Uses secure password hashing
*/

-- Insert a test user into auth.users (this is safe as it's a test account)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT DO NOTHING;

-- Insert test profile
INSERT INTO profiles (id, username, created_at)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'testuser',
  now()
) ON CONFLICT DO NOTHING;

-- Insert test posts
INSERT INTO posts (title, content, author_id, created_at)
VALUES
  (
    'Welcome to Our Blog',
    'This is our first blog post! We''re excited to share our thoughts and ideas with you.',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    now() - interval '2 days'
  ),
  (
    'Getting Started with React',
    'React is a powerful library for building user interfaces. In this post, we''ll explore the basics.',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    now() - interval '1 day'
  );

-- Insert test comments
INSERT INTO comments (content, post_id, author_id, created_at)
SELECT 
  'Great post! Looking forward to more content.',
  id,
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  now()
FROM posts
WHERE title = 'Welcome to Our Blog';