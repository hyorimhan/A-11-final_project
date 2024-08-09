import {
  Community,
  MyPost,
  TEditComment,
  TEditPost,
  TWriteComment,
  TWritePost,
} from '@/types/communityType';

export async function getPostAll(): Promise<Community[]> {
  const response = await fetch('/api/community');
  const data = await response.json();
  return data;
}

export async function getPostByCategory(category: string) {
  const response = await fetch(`/api/community/category/${category}`);
  const data = await response.json();
  return data;
}

export async function getDetailPost(postId: string) {
  const response = await fetch(`/api/community/detail/${postId}`);
  const data = await response.json();
  return data;
}

export async function deletePost(postId: string) {
  const response = await fetch(`/api/community/detail/${postId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function insertPost(newPost: TWritePost) {
  const response = await fetch('/api/community', {
    method: 'POST',
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
}

export async function updatePost(editPost: TEditPost) {
  const response = await fetch(`/api/community/detail/${editPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(editPost),
  });
  const data = await response.json();
  return data;
}

export async function getComments(postId: string) {
  const response = await fetch(`/api/community/comments/${postId}`);
  const data = await response.json();
  return data;
}

export async function deleteComments(id: string) {
  const response = await fetch('/api/community/comments/', {
    method: 'DELETE',
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
}

export async function insertComment(newComment: TWriteComment) {
  const response = await fetch('/api/community/comments/', {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
  const data = await response.json();
  return data;
}

export async function updateComment(editComment: TEditComment) {
  const response = await fetch('/api/community/comments/', {
    method: 'PUT',

    body: JSON.stringify(editComment),
  });
  const data = await response.json();
  return data;
}

export async function getMyPosts(
  user_id: string | undefined,
): Promise<MyPost[]> {
  const response = await fetch(`/api/mypage/my_posts/${user_id}`);
  const data = await response.json();
  return data;
}

export async function likePost(post_id: string, user_id: string) {
  const response = await fetch(
    `/api/community/likes/${post_id}?user_id=${user_id}`,
    {
      method: 'POST',
    },
  );
  const data = await response.json();
  return data;
}

export async function unlikePost(post_id: string, user_id: string) {
  const response = await fetch(
    `/api/community/likes/${post_id}?user_id=${user_id}`,
    {
      method: 'DELETE',
    },
  );
  const data = await response.json();
  return data;
}

export async function getIsLikedPost(post_id: string, user_id: string) {
  const response = await fetch(
    `/api/community/likes/${post_id}?user_id=${user_id}`,
  );
  const data = await response.json();
  return data;
}
