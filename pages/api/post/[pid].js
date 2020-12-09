export default function handler(req, res) {
  // This registers a like
  if (req.method === "POST") {
    console.log("A USER SENT A LIKE!");
    res.end(JSON.stringify({ test: "John Doe" }));
  }

  const {
    query: { pid },
  } = req;

  res.end(`Post: ${pid}`);
}
