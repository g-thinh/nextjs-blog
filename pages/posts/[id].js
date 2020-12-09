import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  // console.log(postData);

  async function postLike() {
    const url = "/api/post/abc";
    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify("User Sent a Like"), // body data type must match "Content-Type" header
    };
    const response = await fetch(url, options);
    return response.json();
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <button
        onClick={(ev) => {
          // ev.preventDefault();
          postLike();
          // .then((json) => console.log(json));
        }}
      >
        Like
      </button>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  // This gets passed onto the dynamic component to be read.
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
