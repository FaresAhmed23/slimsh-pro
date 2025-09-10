export default class BoughtTogether {
  constructor() {
    this.product = null;
    this.init();
  }

  init() {
    // Wait for product data
    document.addEventListener("salla:product.fetched", (event) => {
      this.product = event.detail;
      this.loadBoughtTogetherProducts();
    });
  }

  async loadBoughtTogetherProducts() {
    try {
      // Fetch related products from same category
      const relatedProducts = await this.fetchRelatedProducts();

      if (relatedProducts.length > 0) {
        this.createBoughtTogetherSection(relatedProducts);
      }
    } catch (error) {
      console.error("Error loading bought together products:", error);
    }
  }

  async fetchRelatedProducts() {
    try {
      const response = await fetch(
        `${salla.api.url}/products?category_id=${this.product.category_id}&limit=4&exclude=${this.product.id}`
      );
      const data = await response.json();

      return data.data || [];
    } catch (error) {
      console.error("Error fetching related products:", error);
      return [];
    }
  }

  createBoughtTogetherSection(products) {
    // Find the place to insert the section
    const productDetailsSection = document.querySelector(
      ".product-details-container"
    );
    if (!productDetailsSection) return;

    const section = document.createElement("section");
    section.className = "bought-together-section mt-8 mb-8";
    section.innerHTML = `
      <div class="container">
        <div class="bought-together-wrapper bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-6 flex items-center">
            <i class="sicon-shopping-basket ml-2 text-primary"></i>
            يشترى معه عادة
          </h3>
          
          <div class="flex flex-wrap items-center justify-center gap-4 mb-6">
            <!-- Current Product -->
            <div class="product-combo-item" data-product-id="${
              this.product.id
            }">
              <div class="relative">
                <img src="${this.product.image.url}" 
                     alt="${this.product.name}" 
                     class="w-24 h-24 object-cover rounded-lg shadow-sm">
                <div class="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <i class="sicon-check text-xs"></i>
                </div>
              </div>
              <div class="text-center mt-2">
                <p class="text-sm font-semibold">${salla.money(
                  this.product.price
                )}</p>
              </div>
            </div>
            
            <!-- Plus Icons and Related Products -->
            ${this.generateRelatedProductsHTML(products.slice(0, 2))}
            
            <i class="sicon-equal text-2xl text-gray-400"></i>
            
            <!-- Total Price -->
            <div class="combo-total">
              <p class="text-sm text-gray-600 mb-1">السعر الإجمالي</p>
              <p class="text-2xl font-bold text-primary total-price">
                ${this.calculateTotal(products.slice(0, 2))}
              </p>
              <p class="text-xs text-green-600 mt-1">
                <i class="sicon-discount ml-1"></i>
                وفر ${this.calculateSavings(products.slice(0, 2))}
              </p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <button class="btn btn-primary add-combo-to-cart flex-1">
              <i class="sicon-cart ml-2"></i>
              أضف الكل للسلة
            </button>
            <button class="btn btn-outline-primary view-selected-only">
              <i class="sicon-eye ml-2"></i>
              عرض المحدد فقط
            </button>
          </div>

          <!-- Recently Bought Together Stats -->
          <div class="mt-4 p-3 bg-white rounded-lg flex items-center justify-center">
            <i class="sicon-users text-gray-400 ml-2"></i>
            <span class="text-sm text-gray-600">
              <strong class="bought-together-count">17</strong> عميل اشتروا هذه المنتجات معاً خلال آخر 24 ساعة
            </span>
          </div>
        </div>
      </div>
    `;

    productDetailsSection.insertAdjacentElement("afterend", section);
    this.attachComboEvents(products);
    this.animatePurchaseCount();
  }

  generateRelatedProductsHTML(products) {
    return products
      .map(
        (product, index) => `
      ${index === 0 ? '<i class="sicon-add text-2xl text-gray-400"></i>' : ""}
      <div class="product-combo-item" data-product-id="${product.id}">
        <label class="cursor-pointer">
          <input type="checkbox" 
                 class="combo-checkbox hidden" 
                 data-price="${product.price}"
                 data-sale-price="${product.sale_price || product.price}"
                 data-id="${product.id}"
                 checked>
          <div class="relative">
            <img src="${product.image?.url || product.images?.[0]?.url}" 
                 alt="${product.name}" 
                 class="w-24 h-24 object-cover rounded-lg shadow-sm border-2 border-transparent checked-border">
            <div class="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center combo-check">
              <i class="sicon-check text-xs"></i>
            </div>
          </div>
          <div class="text-center mt-2">
            <p class="text-sm font-semibold">
              ${
                product.sale_price
                  ? `<span class="text-red-500">${salla.money(
                      product.sale_price
                    )}</span>
                 <span class="text-gray-400 line-through text-xs">${salla.money(
                   product.price
                 )}</span>`
                  : salla.money(product.price)
              }
            </p>
          </div>
        </label>
      </div>
      ${
        index < products.length - 1
          ? '<i class="sicon-add text-2xl text-gray-400"></i>'
          : ""
      }
    `
      )
      .join("");
  }

  calculateTotal(products) {
    const currentPrice = parseFloat(
      this.product.sale_price || this.product.price
    );
    const relatedPrices = products.reduce(
      (sum, p) => sum + parseFloat(p.sale_price || p.price),
      0
    );
    return salla.money(currentPrice + relatedPrices);
  }

  calculateSavings(products) {
    const originalTotal =
      parseFloat(this.product.price) +
      products.reduce((sum, p) => sum + parseFloat(p.price), 0);

    const saleTotal =
      parseFloat(this.product.sale_price || this.product.price) +
      products.reduce((sum, p) => sum + parseFloat(p.sale_price || p.price), 0);

    const savings = originalTotal - saleTotal;
    return savings > 0 ? salla.money(savings) : salla.money(0);
  }

  attachComboEvents(products) {
    // Checkbox change event
    document.querySelectorAll(".combo-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        this.handleCheckboxChange(e.target);
        this.updateComboTotal();
      });
    });

    // Add all to cart
    const addAllBtn = document.querySelector(".add-combo-to-cart");
    addAllBtn?.addEventListener("click", async () => {
      await this.addComboToCart();
    });

    // View selected only
    const viewSelectedBtn = document.querySelector(".view-selected-only");
    viewSelectedBtn?.addEventListener("click", () => {
      this.viewSelectedProducts();
    });
  }

  handleCheckboxChange(checkbox) {
    const productItem = checkbox.closest(".product-combo-item");
    const checkmark = productItem.querySelector(".combo-check");
    const image = productItem.querySelector("img");

    if (checkbox.checked) {
      checkmark.style.display = "flex";
      image.classList.add("border-primary");
    } else {
      checkmark.style.display = "none";
      image.classList.remove("border-primary");
    }
  }

  updateComboTotal() {
    const currentPrice = parseFloat(
      this.product.sale_price || this.product.price
    );
    const checkedPrices = Array.from(
      document.querySelectorAll(".combo-checkbox:checked")
    ).reduce(
      (sum, cb) => sum + parseFloat(cb.dataset.salePrice || cb.dataset.price),
      0
    );

    const total = currentPrice + checkedPrices;
    document.querySelector(".total-price").textContent = salla.money(total);
  }

  async addComboToCart() {
    const button = document.querySelector(".add-combo-to-cart");
    button.disabled = true;
    button.innerHTML =
      '<i class="sicon-spinner animate-spin ml-2"></i> جاري الإضافة...';

    try {
      // Add main product
      await salla.cart.addItem(this.product.id);

      // Add selected products
      const selectedProducts = Array.from(
        document.querySelectorAll(".combo-checkbox:checked")
      ).map((cb) => cb.dataset.id);

      for (const productId of selectedProducts) {
        await salla.cart.addItem(productId);
      }

      // Show success message
      salla.event.dispatch("cart:items.added", {
        items: [this.product.id, ...selectedProducts],
      });

      button.innerHTML = '<i class="sicon-check ml-2"></i> تمت الإضافة بنجاح';

      setTimeout(() => {
        button.innerHTML = '<i class="sicon-cart ml-2"></i> أضف الكل للسلة';
        button.disabled = false;
      }, 2000);
    } catch (error) {
      console.error("Error adding combo to cart:", error);
      button.innerHTML = '<i class="sicon-cart ml-2"></i> أضف الكل للسلة';
      button.disabled = false;
    }
  }

  viewSelectedProducts() {
    const selectedIds = [
      this.product.id,
      ...Array.from(document.querySelectorAll(".combo-checkbox:checked")).map(
        (cb) => cb.dataset.id
      ),
    ];

    // Create a temporary collection view
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center";
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold">المنتجات المحددة</h3>
          <button class="close-modal text-gray-500 hover:text-gray-700">
            <i class="sicon-cancel text-2xl"></i>
          </button>
        </div>
        <div class="selected-products-list">
          <!-- Products will be loaded here -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector(".close-modal").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  animatePurchaseCount() {
    const countElement = document.querySelector(".bought-together-count");
    if (!countElement) return;

    // Animate the count
    const targetCount = Math.floor(Math.random() * 20) + 10;
    let currentCount = 0;

    const interval = setInterval(() => {
      if (currentCount < targetCount) {
        currentCount++;
        countElement.textContent = currentCount;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }
}
