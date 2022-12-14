import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../Button";

const StoryCard = ({ story }) => {
  // console.log(blog);

  return (
    <article className="bg-white overflow-hidden rounded-lg text-center shadow-2xl">
      <div className="w-full h-72 relative">
        <Image src={story.featuredImage.url} alt={story.title} layout="fill" />
      </div>
      <div className="space-y-3 p-5">
        <h2 className="text-3xl font-semibold hover:text-[#6B58FA] hover:drop-shadow-md transition-all delay-100 small:text-2xl">
          <Link href={`story/${story.slug}`}>{story.title}</Link>
        </h2>
        <div className="flex justify-center items-center gap-10 small:flex-col small:gap-2">
          <div className="flex items-center gap-1">
            <div className="h-9 w-9 rounded-full overflow-hidden relative">
              <Image src={story.author.avatar.url} alt={story.author.name} layout="fill" />
            </div>
            <p className="text-lg font-semibold">{story.author.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl">📅</span>
            <p className="text-base">{moment(story.createdAt).format("ll")}</p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, maiores laborum
          impedit quos natus labore distinctio, id accusantium excepturi quam laboriosam explicabo
          repellat! Nihil molestias dolor perferendis deserunt alias suscipit!
        </p>

        <Button label="Read" to={`post/${story.slug}`} />
      </div>
    </article>
  );
};

export default StoryCard;
