export const isLoggedIn = () => {
  return localStorage.getItem("token");
};

export const formatMoney = amount => {
  let dollarUSLocale = Intl.NumberFormat("en-US")
  return dollarUSLocale.format(amount)
}
