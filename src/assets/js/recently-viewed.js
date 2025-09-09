export default class RecentlyViewed {
  constructor() {
    this.storageKey = "salla_recently_viewed";
    this.maxItems = 12;
    this.init();
  }

  init() {
    // Track current product if on product page
    if (
      window.location.pathname.includes("/product/") ||
      window.location.pathname.includes("/p/")
    ) {
      this.trackProduct();
    }

    // Display recently viewed on home page
    if (document.querySelector(".recently-viewed-section")) {
      this.displayProducts();
    }
  }

  trackProduct() {
    // Wait for product data
    document.addEventListener("salla:product.fetched", (event) => {
      const product = event.detail;

      const productData = {
        id: product.id,
        name: product.name,
        url: product.url,
        image: product.image?.url || product.images?.[0]?.url,
        price: product.price,
        sale_price: product.sale_price,
        currency: product.currency,
        timestamp: Date.now(),
      };

      this.saveProduct(productData);
    });
  }

  saveProduct(productData) {
    let products = this.getProducts();
    products = products.filter((p) => p.id !== productData.id);
    products.unshift(productData);
    products = products.slice(0, this.maxItems);

    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getProducts() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const products = JSON.parse(stored);
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

      return products.filter((p) => p.timestamp > oneDayAgo);
    } catch (e) {
      return [];
    }
  }

  displayProducts() {
    const products = this.getProducts();
    if (products.length < 2) return;

    const container = document.querySelector(".recently-viewed-products");
    if (!container) return;

    document
      .querySelector(".recently-viewed-section")
      ?.classList.remove("hidden");

    container.innerHTML = products
      .map(
        (product) => `
      <div class="swiper-slide">
        <div class="product-card">
          <a href="${product.url}">
            <img src="${product.image}" alt="${
          product.name
        }" class="w-full h-48 object-cover rounded-lg mb-3">
            <h3 class="text-sm font-semibold mb-2">${product.name}</h3>
            <div class="flex items-center gap-2">
              ${
                product.sale_price
                  ? `
                <span class="text-red-500 font-bold">${product.sale_price} ${product.currency}</span>
                <span class="text-gray-400 line-through text-sm">${product.price} ${product.currency}</span>
              `
                  : `
                <span class="font-bold">${product.price} ${product.currency}</span>
              `
              }
            </div>
          </a>
        </div>
      </div>
    `
      )
      .join("");
  }
}
