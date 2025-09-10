export default class RecentlyViewed {
  constructor() {
    this.storageKey = "salla_recently_viewed";
    this.maxItems = 15;
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

    // Display recently viewed on home and category pages
    this.displayProducts();

    // Auto-refresh display every 30 seconds
    setInterval(() => this.displayProducts(), 30000);
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
        rating: product.rating?.value || 0,
        category_id: product.category_id,
        brand: product.brand?.name || "",
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

    // Trigger custom event
    document.dispatchEvent(
      new CustomEvent("recently-viewed:updated", { detail: products })
    );
  }

  getProducts() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const products = JSON.parse(stored);
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

      return products.filter((p) => p.timestamp > oneDayAgo);
    } catch (e) {
      console.error("Error getting recently viewed products:", e);
      return [];
    }
  }

  displayProducts() {
    const products = this.getProducts();
    if (products.length < 2) return;

    const containers = document.querySelectorAll(".recently-viewed-products");
    if (!containers.length) return;

    // Show the section
    document.querySelectorAll(".recently-viewed-section").forEach((section) => {
      section.classList.remove("hidden");
      section.classList.add("has-products");
    });

    const productsHTML = products
      .map(
        (product) => `
      <div class="recently-viewed-item relative group">
        <a href="${product.url}" class="block">
          <div class="relative overflow-hidden rounded-lg mb-3">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
            ${
              product.sale_price
                ? `
              <div class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                خصم ${Math.round(
                  ((product.price - product.sale_price) / product.price) * 100
                )}%
              </div>
            `
                : ""
            }
          </div>
          <h3 class="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            ${product.name}
          </h3>
          <div class="flex items-center justify-between">
            <div class="price-wrapper">
              ${
                product.sale_price
                  ? `
                <span class="text-red-500 font-bold">${salla.money(
                  product.sale_price
                )}</span>
                <span class="text-gray-400 line-through text-sm mr-2">${salla.money(
                  product.price
                )}</span>
              `
                  : `
                <span class="font-bold text-primary">${salla.money(
                  product.price
                )}</span>
              `
              }
            </div>
            ${
              product.rating > 0
                ? `
              <div class="flex items-center">
                <i class="sicon-star text-yellow-400 text-xs"></i>
                <span class="text-xs text-gray-600 mr-1">${product.rating}</span>
              </div>
            `
                : ""
            }
          </div>
        </a>
      </div>
    `
      )
      .join("");

    containers.forEach((container) => {
      container.innerHTML = productsHTML;
    });
  }
}
