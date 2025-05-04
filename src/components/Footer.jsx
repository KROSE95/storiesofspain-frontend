// const Footer = () => {
//     return (
//         <footer className="custom-footer text-center py-4 mt-5">

//         <p>&copy; {new Date().getFullYear()} BookExplorer | Coursework</p>
//       </footer>
      
//     );

// };
const Footer = () => {
    return (
      <footer className="custom-footer text-center py-4 mt-5">
        <div className="footer-links d-flex justify-content-center gap-4 mb-2">
          <a href="/books">Books</a>
          <a href="/mybooks">My Books</a>
          
        </div>
        <p className="fst-italic small">Travel through stories — discover books by place and genre</p>
        <p className="small text-muted">
          &copy; {new Date().getFullYear()} BookExplorer | Coursework 
          
        </p>
      </footer>
    );
  };
  

export default Footer;