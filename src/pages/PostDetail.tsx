import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { User, Clock } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      const { data: postData } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (username)
        `)
        .eq('id', id)
        .single();

      if (postData) {
        setPost(postData);
      }

      const { data: commentsData } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (username)
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (commentsData) {
        setComments(commentsData);
      }

      setLoading(false);
    }

    fetchPost();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) return;

    const { data: comment, error } = await supabase
      .from('comments')
      .insert([
        {
          content: newComment,
          post_id: id,
          author_id: user.id
        }
      ])
      .select(`
        *,
        profiles (username)
      `)
      .single();

    if (!error && comment) {
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-500 mb-8">
          <div className="flex items-center space-x-2 mr-4">
            <User size={16} />
            <span>{post.profiles.username}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
          </div>
        </div>
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Comments</h2>
        
        {user && (
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4"
              rows={3}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </form>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <div className="flex items-center space-x-2 mr-4">
                  <User size={14} />
                  <span>{comment.profiles.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={14} />
                  <span>{format(new Date(comment.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}