// Convert to cents for precision
function toCents(amount: number): number {
  return Math.round(amount * 100);
}

// Convert from cents to dollars
function toDollars(amount: number): number {
  return amount / 100;
}

// Add item prices
// input: array of prices in dollars
// output: total price in cents
function calculateSubtotal(prices: number[]): number {
  return prices.reduce((total, price) => total + toCents(price), 0);
}

// Apply a percentage discount
// input: amount in dollars, discount percentage
// output: discounted amount in cents
function applyDiscount(amount: number, discountPercentage: number): number {
  const discountAmount = toCents(amount * (discountPercentage / 100));
  return amount - toCents(discountAmount);
}

// Calculate tax amount
// input: amount in dollars, tax rate percentage
// output: tax amount in cents
function calculateTax(amount: number, taxRate: number): number {
  return toCents(amount * (taxRate / 100));
}

// Apply a fixed amount discount
// input: amount in dollars, discount amount in dollars
// output: discounted amount in cents
function applyCoupon(amount: number, couponAmount: number): number {
  return toCents(amount - couponAmount);
}

// Calculate simple interest
// input: principal amount, interest rate, time in years
// output: interest amount in cents
function calculateSimpleInterest(principal: number, rate: number, time: number): number {
  return toCents(principal * rate * time);
}

// Calculate compound interest
// input: principal amount, interest rate, time in years, number of times interest is compounded per year
// output: interest amount in cents
function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  n: number = 1
): number {
  return toCents(principal * Math.pow(1 + rate / n, n * time) - principal);
}

// Apply multiple discounts/coupons
// input: amount in dollars, array of discounts in percentage
// output: discounted amount in cents
function applyMultipleDiscounts(amount: number, discounts: number[]): number {
  return discounts.reduce(applyDiscount, amount);
}
