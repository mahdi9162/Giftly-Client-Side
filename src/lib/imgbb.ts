export const uploadImageToImgbb = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('ImageBB API key not found');
  }

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data?.success) {
    throw new Error(data?.error?.message || 'Image upload failed');
  }

  return data.data.url;
};
