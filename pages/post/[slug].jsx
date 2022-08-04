import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import getPost from "../../services/post";
import getPosts from "../../services/posts";

export const getStaticPaths = async () => {
  const { posts } = await getPosts();
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const { post } = await getPost(slug);
  return { props: { post } };
};

const Details = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    console.log("fallback");
  }

  const { title, featuredImage, author, createdAt, content } = post;

  return (
    <>
      <Head>
        <title>Web Stories || {title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container mx-auto grid grid-cols-3 py-5 gap-5">
        <div className="col-span-2 bg-white p-5 rounded-lg min-h-screen space-y-3 ">
          <figure className="space-y-3">
            <figcaption className="text-4xl font-semibold inline-flex gap-4">
              <span className="text-5xl text-[#6B58FA]">➦</span>
              <span>{title}</span>
            </figcaption>
            <div className="relative w-full h-96 rounded-md overflow-hidden">
              <Image src={featuredImage.url} alt={title} layout="fill" />
            </div>
          </figure>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div className="h-9 w-9 rounded-full overflow-hidden relative">
                <Image src={author.avatar.url} alt={author.name} layout="fill" />
              </div>
              <p className="text-lg font-semibold">{author.name}</p>
            </div>

            <div className="flex items-center gap-1">
              <label className="text-2xl">📅</label>
              <time className="text-base">{moment(createdAt).format("ll")}</time>
            </div>
          </div>

          <div>{content.markdown}</div>
          {/* rest content print here */}
        </div>
        <aside className="col-span-1">
          <div className="sticky top-20 bg-white p-5 rounded-lg">sidebar items</div>
        </aside>
      </section>
    </>
  );
};

export default Details;