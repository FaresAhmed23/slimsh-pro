export default class BrandFilter {
  constructor() {
    this.init();
  }

  init() {
    if (!this.isCategoryPage()) return;

    // انتظر تحميل المنتجات
    window.addEventListener("salla:products.fetched", () => {
      this.createBrandFilter();
    });
  }

  isCategoryPage() {
    return (
      window.location.pathname.includes("/category/") ||
      document.querySelector(".s-products-list")
    );
  }

  createBrandFilter() {
    const filterContainer = document.querySelector(
      ".filters-container, #filters-menu"
    );
    if (!filterContainer) return;

    const brands = this.collectBrands();
    if (brands.length === 0) return;

    const brandFilterHTML = `
      <div class="brand-filter-section mb-6 border-b pb-6">
        <h3 class="font-bold mb-4">تسوق حسب الماركة</h3>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          ${brands
            .map(
              (brand) => `
            <label class="flex items-center cursor-pointer hover:text-primary">
              <input type="checkbox" 
                     class="brand-checkbox ml-2" 
                     value="${brand.name}">
              <span>${brand.name} (${brand.count})</span>
            </label>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    // أضف بعد فلتر الأسعار
    const priceFilter = filterContainer.querySelector(".price-filter");
    if (priceFilter) {
      priceFilter.insertAdjacentHTML("afterend", brandFilterHTML);
    } else {
      filterContainer.insertAdjacentHTML("afterbegin", brandFilterHTML);
    }

    this.attachEvents();
  }

  collectBrands() {
    const brandsMap = new Map();

    document.querySelectorAll(".product-entry").forEach((product) => {
      const brandEl = product.querySelector(".product-brand");
      if (brandEl) {
        const brandName = brandEl.textContent.trim();
        brandsMap.set(brandName, (brandsMap.get(brandName) || 0) + 1);
      }
    });

    return Array.from(brandsMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  attachEvents() {
    document.querySelectorAll(".brand-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", () => this.filterProducts());
    });
  }

  filterProducts() {
    const selectedBrands = Array.from(
      document.querySelectorAll(".brand-checkbox:checked")
    ).map((cb) => cb.value);

    document.querySelectorAll(".product-entry").forEach((product) => {
      const brandEl = product.querySelector(".product-brand");
      const brandName = brandEl ? brandEl.textContent.trim() : "";

      if (selectedBrands.length === 0 || selectedBrands.includes(brandName)) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });
  }
}
