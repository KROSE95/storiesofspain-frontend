const Footer = () => {
    return (
        <footer
        className="text-center py-3 mt-5"
        style={{
          backgroundColor: "var(--color-rich-wood)",
          color: "#fff"
        }}
      >
        <p>&copy; {new Date().getFullYear()} BookExplorer | Coursework</p>
      </footer>
      
    );

};

export default Footer;