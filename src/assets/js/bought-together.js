export default class BoughtTogether {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("product::data.fetched", (event) => {
      this.product = event.detail.product;
      this.loadRelatedProducts();
    });
  }

  async loadRelatedProducts() {
    try {
      const relatedProducts = await this.fetchRelatedProducts();

      if (relatedProducts && relatedProducts.length > 0) {
        this.displayBoughtTogether(relatedProducts);
      }
    } catch (error) {
      console.error("Error loading bought together products:", error);
    }
  }

  async fetchRelatedProducts() {
    const response = await fetch(
      `${salla.api.url}/products?category=${this.product.category_id}&limit=4`
    );
    const data = await response.json();

    return data.data.filter((p) => p.id !== this.product.id);
  }

  displayBoughtTogether(products) {
    const container = document.querySelector(".bought-together-section");
    if (!container) return;

    container.classList.remove("hidden");

    const html = `
      <div class="bought-together-wrapper bg-gray-50 rounded-lg p-6">
        <h3 class="text-xl font-bold mb-4">يشترى معه عادة</h3>
        
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <!-- Current Product -->
          <div class="product-combo-item">
            <img src="${this.product.image.url}" 
                 alt="${this.product.name}" 
                 class="w-20 h-20 object-cover rounded-lg">
            <div class="text-center mt-2">
              <p class="text-sm font-semibold">${this.formatPrice(
                this.product.price
              )}</p>
            </div>
          </div>
          
          <i class="sicon-add text-2xl text-gray-400"></i>
          
          <!-- Related Products -->
          ${products
            .slice(0, 2)
            .map(
              (product) => `
            <div class="product-combo-item" data-product-id="${product.id}">
              <label class="cursor-pointer">
                <input type="checkbox" 
                       class="combo-checkbox hidden" 
                       data-price="${product.price}"
                       data-id="${product.id}"
                       checked>
                <div class="relative">
                  <img src="${product.image?.url || product.images?.[0]?.url}" 
                       alt="${product.name}" 
                       class="w-20 h-20 object-cover rounded-lg">
                  <div class="absolute top-1 right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center combo-check">
                    <i class="sicon-check text-xs"></i>
                  </div>
                </div>
                <div class="text-center mt-2">
                  <p class="text-sm font-semibold">${this.formatPrice(
                    product.price
                  )}</p>
                </div>
              </label>
            </div>
          `
            )
            .join('<i class="sicon-add text-2xl text-gray-400"></i>')}
          
          <i class="sicon-equal text-2xl text-gray-400"></i>
          
          <!-- Total Price -->
          <div class="combo-total ml-4">
            <p class="text-sm text-gray-600 mb-1">السعر الإجمالي</p>
            <p class="text-2xl font-bold text-primary total-price">${this.calculateTotal(
              products.slice(0, 2)
            )}</p>
          </div>
        </div>
        
        <button class="btn btn-primary add-combo-to-cart w-full md:w-auto">
          <i class="sicon-shopping-bag ml-2"></i>
          أضف الكل للسلة
        </button>
      </div>
    `;

    container.innerHTML = html;
    this.attachComboEvents(products);
  }

  formatPrice(price) {
    return `${price} ${this.product.currency}`;
  }

  calculateTotal(products) {
    const currentPrice = parseFloat(this.product.price);
    const relatedPrices = products.reduce(
      (sum, p) => sum + parseFloat(p.price),
      0
    );
    const total = currentPrice + relatedPrices;

    return this.formatPrice(total.toFixed(2));
  }

  attachComboEvents(products) {
    document.querySelectorAll(".combo-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.updateComboTotal();

        const checkmark = checkbox
          .closest("label")
          .querySelector(".combo-check");
        checkmark.style.display = checkbox.checked ? "flex" : "none";
      });
    });

    const addAllBtn = document.querySelector(".add-combo-to-cart");
    addAllBtn?.addEventListener("click", async () => {
      await salla.cart.addItem(this.product.id);

      const selectedProducts = Array.from(
        document.querySelectorAll(".combo-checkbox:checked")
      ).map((cb) => cb.dataset.id);

      for (const productId of selectedProducts) {
        await salla.cart.addItem(productId);
      }

      salla.event.dispatch("cart:items.added", {
        items: [this.product.id, ...selectedProducts],
      });
    });
  }

  updateComboTotal() {
    const currentPrice = parseFloat(this.product.price);
    const checkedPrices = Array.from(
      document.querySelectorAll(".combo-checkbox:checked")
    ).reduce((sum, cb) => sum + parseFloat(cb.dataset.price), 0);

    const total = currentPrice + checkedPrices;
    document.querySelector(".total-price").textContent = this.formatPrice(
      total.toFixed(2)
    );
  }
}

if (window.location.pathname.includes("/product/")) {
  new BoughtTogether();
}
