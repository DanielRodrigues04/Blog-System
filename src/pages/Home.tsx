import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Clock, MessageCircle, User } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
  comments: {
    count: number;
  }[];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (username),
          comments:comments(count)
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Latest Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{post.profiles.username}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={16} />
                    <span>{post.comments[0]?.count || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}