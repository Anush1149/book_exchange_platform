import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import "./home.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleSignOut = () =>{
    signOut(auth).then(()=>console.log("Signed out successfull")).catch((error)=>console.log(error));
  }

  useEffect(() => {
    // Check authentication status on mount
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Redirect if not authenticated
      }
    });

    // Fetch data from Firestore when the component mounts
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksArray = [];
      querySnapshot.forEach((doc) => {
        booksArray.push({ id: doc.id, ...doc.data() });
      });
      setBooks(booksArray); // Set books to the state
    };

    getData(); // Fetch books data when component mounts
  }, [navigate]); // Dependency array makes sure this only runs once on mount

  return (
    <div className="home-container">
      <nav className="home-nav">
        <ul className="hn-ul">
          <li onClick={()=>navigate("/home")}>HOME</li>
          <li onClick={()=>navigate("/write")}>WRITE</li>
          <li>CONTACT</li>
          <li onClick={handleSignOut}>LOGOUT</li>
        </ul>
      </nav>
      <div className="home-post">
        {/* Loop through the books array and render each book */}
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Condition:</strong> {book.condition}</p>
            <p><strong>Availability:</strong> {book.availability}</p>
            <p><strong>Genres:</strong> {book.genre.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
