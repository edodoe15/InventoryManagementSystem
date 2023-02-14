export const saveLoginData = (korisnik) => {
  localStorage.setItem('korisnik', JSON.stringify(korisnik));
};

export const removeLoginData = () => {
  localStorage.removeItem('korisnik');
}

export const getLoggedData = () => {
  const korisnik = localStorage.getItem('korisnik');
  return korisnik ? JSON.parse(korisnik) : korisnik;
}