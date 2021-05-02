import { db } from "../../firebase-config/firebase";
import { useRouter } from "next/router";
import { useState } from "react";

export default function blogpage({ blog, user, allComments }) {
  const [mycomment, setmycomment] = useState("");
  const [allcommetsoftheblog, setallcommetsoftheblog] = useState(allComments);
  const router = useRouter();
  const { blogid } = router.query;
  const makeComment = async () => {
    await db.collection("blogs").doc(blogid).collection("comments").add({
      text: mycomment,
      name: user.displayName,
    });
    M.toast({ html: `welcome, comment added!`, classes: "green" });

    const commentQuery = await db
      .collection("blogs")
      .doc(blogid)
      .collection("comments")
      .get();
    setallcommetsoftheblog(commentQuery.docs.map((docSnap) => docSnap.data()));
  };
  return (
    <div className="container center">
      <h2>{blog.title}</h2>
      <h5>Created On - {new Date(blog.createdAt).toDateString()}</h5>
      <img src={blog.imageUrl} alt={blog.title} />
      <p>{blog.body}</p>

      {user ? (
        <>
          <div className="input-field">
            <input
              type="text"
              placeholder="add a comment"
              value={mycomment}
              onChange={(e) => setmycomment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary #00796b teal darken-2"
            onClick={() => makeComment()}
          >
            comment
          </button>
        </>
      ) : (
        <h5>please login to make comments</h5>
      )}

      <br />
      <div className="left-align">
        {allcommetsoftheblog.map((item) => {
          return (
            <h6 key={item.name}>
              <span>{item.name}</span> {item.text}
            </h6>
          );
        })}
      </div>
      <style jsx global>
        {`
          span {
            font-weight: 500;
          }
          img {
            width: 100%;
            max-width: 500px;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ params: { blogid } }) {
  const result = await db.collection("blogs").doc(blogid).get();
  const allCommentsSnap = await db
    .collection("blogs")
    .doc(blogid)
    .collection("comments")
    .get();

  const allComments = allCommentsSnap.docs.map((comDocSnap) =>
    comDocSnap.data()
  );
  return {
    props: {
      blog: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis(),
      },
      allComments,
    }, // will be passed to the page component as props
  };
}
