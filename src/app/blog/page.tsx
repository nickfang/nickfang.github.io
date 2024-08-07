'use client';

const Blog = () => {
  return (
    <div>
      <h1 className="color-white my-8">Blog</h1>
      <h2 className="my-8 text-left">Playing with <a href="https://kit.svelte.dev/"><strong><em>Svelte Kit</em></strong></a> to make a blog.</h2>
      <p className="my-8">This <a href="https://kit.svelte.dev/">Svelte-powered</a> blog serves as my personal knowledge repository, capturing insights and discoveries on my coding journey. By leveraging Markdown&apos;s simplicity, I can seamlessly integrate content from various sources, including AI-generated material.  Explore my notes and reflections as I delve into new technologies and refine my skills.  The site is hosted on <a href="https://vercel.com">Vercel</a> for easy access and updates.</p>
      <div className="flex justify-center">
        <a href="https://codingexperience.dev" className="my-8 text-center"><button><h1>Blog: Coding Experience</h1></button></a>
      </div>
    </div>
  );
};

export default Blog;
