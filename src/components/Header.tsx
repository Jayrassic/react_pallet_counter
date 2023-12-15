function Header() {
  const calcHandler = () => {};

  return (
    <header>
      <h1>Pallet Counter</h1>
      <div>
        <h3>Total Weight: {totalWeight}</h3>
      </div>
      <div>
        <button onClick={calcHandler}>Calculate</button>
      </div>
    </header>
  );
}

export default Header;
