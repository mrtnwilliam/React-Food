export default function Header ({cart , handleClick}) {
  return (
    <header id="main-header">
      <div id="title">
        <img src="./logo.jpg" alt="Logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button onClick={handleClick} className="text-button">Cart&#40;{cart.numberOfOrders}&#41;</button>
    </header>
  );
}
